import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { adapty } from 'react-native-adapty';
import type { AdaptyPaywallProduct, AdaptyProfile } from 'react-native-adapty';
import { COLORS } from '@/lib/constants';

const PREMIUM_FEATURES = [
  { icon: '📖', title: 'Full 4-Week Programs', subtitle: 'All Chapters unlocked (I–IV)', color: '#E8B94F' },
  { icon: '📊', title: 'Advanced Analytics', subtitle: 'Deep progress insights & trends', color: '#3498DB' },
  { icon: '🌍', title: 'Global Leaderboard', subtitle: 'Compete with Somatics heroes worldwide', color: '#27AE60' },
  { icon: '⚡', title: 'Priority Updates', subtitle: 'New exercise packs first', color: COLORS.ember },
  { icon: '🏆', title: 'Exclusive Badges', subtitle: 'Premium-only achievement titles', color: '#9B59B6' },
  { icon: '💬', title: 'Form Tips Pro', subtitle: 'Expert coaching notes per exercise', color: '#FF6B35' },
];

function ProductCard({
  product,
  isSelected,
  onSelect,
  isBestValue,
}: {
  product: AdaptyPaywallProduct;
  isSelected: boolean;
  onSelect: () => void;
  isBestValue: boolean;
}) {
  const price = product.price?.localizedString ?? 'N/A';
  const period = product.subscription?.subscriptionPeriod;
  const periodLabel = period
    ? period.numberOfUnits === 1
      ? `/ ${period.unit}`
      : `/ ${period.numberOfUnits} ${period.unit}s`
    : '';

  return (
    <TouchableOpacity
      style={[styles.productCard, isSelected && styles.productCardSelected]}
      onPress={onSelect}
      activeOpacity={0.85}
    >
      {isBestValue && (
        <View style={styles.bestValueBadge}>
          <Text style={styles.bestValueText}>BEST VALUE</Text>
        </View>
      )}
      <View style={styles.productLeft}>
        <View style={[styles.productRadio, isSelected && styles.productRadioSelected]}>
          {isSelected && <View style={styles.productRadioDot} />}
        </View>
        <View>
          <Text style={[styles.productTitle, isSelected && { color: COLORS.premiumGold }]}>
            {product.localizedTitle}
          </Text>
          <Text style={styles.productDesc}>{product.localizedDescription}</Text>
        </View>
      </View>
      <Text style={[styles.productPrice, isSelected && { color: COLORS.premiumGold }]}>
        {price}
        {periodLabel ? (
          <Text style={styles.productPeriod}>{periodLabel}</Text>
        ) : null}
      </Text>
    </TouchableOpacity>
  );
}

export default function PaywallScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [products, setProducts] = useState<AdaptyPaywallProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<AdaptyPaywallProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    loadPaywall();
    checkPremium();
  }, []);

  const checkPremium = async () => {
    try {
      const profile = await adapty.getProfile();
      const premium = profile?.accessLevels?.['premium']?.isActive ?? false;
      setIsPremium(premium);
    } catch {
      // Ignore
    }
  };

  const loadPaywall = async () => {
    try {
      setIsLoading(true);
      const PLACEMENT_ID = process.env.EXPO_PUBLIC_ADAPTY_PLACEMENT_ID ?? 'somatics_premium';
      const pw = await adapty.getPaywall(PLACEMENT_ID);
      const prods = await adapty.getPaywallProducts(pw);
      setProducts(prods);
      if (prods.length > 0) {
        // Default select the first product (usually annual)
        setSelectedProduct(prods[0]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!selectedProduct || isPurchasing) return;
    try {
      setIsPurchasing(true);
      setError(null);
      const result = await adapty.makePurchase(selectedProduct);
      switch (result.type) {
        case 'success':
          handleSuccess(result.profile);
          break;
        case 'user_cancelled':
          break;
        case 'pending':
          setError('Purchase is pending approval');
          break;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Purchase failed. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleSuccess = (profile: AdaptyProfile) => {
    const premium = profile?.accessLevels?.['premium']?.isActive ?? false;
    if (premium) {
      setIsPremium(true);
    }
    router.back();
  };

  const handleRestore = async () => {
    try {
      setIsPurchasing(true);
      const profile = await adapty.restorePurchases();
      const premium = profile?.accessLevels?.['premium']?.isActive ?? false;
      if (premium) {
        setIsPremium(true);
        router.back();
      } else {
        setError('No active subscription found to restore.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Restore failed.');
    } finally {
      setIsPurchasing(false);
    }
  };

  if (isPremium) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.alreadyPremium}>
          <Text style={styles.alreadyPremiumIcon}>⚡</Text>
          <Text style={styles.alreadyPremiumTitle}>{"YOU'RE A LEGEND!"}</Text>
          <Text style={styles.alreadyPremiumSub}>Somatics+ is active. All chapters unlocked.</Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
            <Text style={styles.doneBtnText}>BACK TO TRAINING</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background glow */}
      <View style={styles.glowOrb} />

      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} disabled={isPurchasing}>
        <Text style={styles.closeBtnText}>✕</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>⚡ PREMIUM TIER</Text>
          </View>
          <Text style={styles.titleLine1}>SOMATICS</Text>
          <Text style={styles.titleLine2}>PLUS+</Text>
          <Text style={styles.tagline}>
            {"Unlock the full hero's journey.\nTrain harder. Rise higher."}
          </Text>
        </View>

        {/* Feature list */}
        <View style={styles.featureList}>
          {PREMIUM_FEATURES.map((feat) => (
            <View key={feat.title} style={styles.featureRow}>
              <View style={[styles.featureIconWrapper, { backgroundColor: `${feat.color}18` }]}>
                <Text style={styles.featureIcon}>{feat.icon}</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feat.title}</Text>
                <Text style={styles.featureSub}>{feat.subtitle}</Text>
              </View>
              <Text style={styles.featureCheck}>✓</Text>
            </View>
          ))}
        </View>

        {/* Products */}
        <View style={styles.productsSection}>
          <Text style={styles.productsSectionTitle}>CHOOSE YOUR PLAN</Text>

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>⚠️  {error}</Text>
            </View>
          )}

          {isLoading ? (
            <View style={styles.loadingProducts}>
              <ActivityIndicator color={COLORS.premiumGold} />
              <Text style={styles.loadingProductsText}>Loading plans...</Text>
            </View>
          ) : products.length === 0 ? (
            <View style={styles.noProducts}>
              <Text style={styles.noProductsText}>
                Products unavailable. Please check your Adapty configuration.
              </Text>
              <TouchableOpacity style={styles.retryBtn} onPress={loadPaywall}>
                <Text style={styles.retryBtnText}>RETRY</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.productList}>
              {products.map((product, idx) => (
                <ProductCard
                  key={product.vendorProductId}
                  product={product}
                  isSelected={selectedProduct?.vendorProductId === product.vendorProductId}
                  onSelect={() => setSelectedProduct(product)}
                  isBestValue={idx === 0}
                />
              ))}
            </View>
          )}
        </View>

        {/* Fine print */}
        <Text style={styles.finePrint}>
          Cancel anytime. Subscription renews automatically. See Terms & Privacy.
        </Text>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[
            styles.subscribeBtn,
            (!selectedProduct || isPurchasing || isLoading) && styles.subscribeBtnDisabled,
          ]}
          onPress={handlePurchase}
          disabled={!selectedProduct || isPurchasing || isLoading}
          activeOpacity={0.85}
        >
          {isPurchasing ? (
            <ActivityIndicator color={COLORS.obsidian} />
          ) : (
            <Text style={styles.subscribeBtnText}>
              {selectedProduct ? 'START SOMATICS+  →' : 'SELECT A PLAN'}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={handleRestore} disabled={isPurchasing}>
            <Text style={styles.restoreText}>Restore Purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} disabled={isPurchasing}>
            <Text style={styles.notNowText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.obsidian },
  glowOrb: {
    position: 'absolute',
    top: -80,
    left: '50%',
    marginLeft: -160,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(232, 185, 79, 0.06)',
  },
  closeBtn: {
    position: 'absolute',
    top: 52,
    right: 20,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.obsidianCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  closeBtnText: { color: COLORS.textLightMuted, fontSize: 16, fontWeight: '700' },
  scroll: { paddingHorizontal: 24, paddingTop: 60, gap: 28 },
  // Header
  header: { alignItems: 'center', gap: 10 },
  premiumBadge: {
    borderWidth: 1,
    borderColor: COLORS.premiumGold,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: COLORS.premiumGoldGlow,
  },
  premiumBadgeText: {
    color: COLORS.premiumGold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
  },
  titleLine1: {
    color: COLORS.white,
    fontSize: 60,
    fontWeight: '900',
    lineHeight: 60,
    letterSpacing: -1,
    textAlign: 'center',
  },
  titleLine2: {
    color: COLORS.premiumGold,
    fontSize: 60,
    fontWeight: '900',
    lineHeight: 60,
    letterSpacing: -1,
    textAlign: 'center',
    marginTop: -6,
  },
  tagline: {
    color: COLORS.textLightMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 4,
  },
  // Features
  featureList: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
    gap: 14,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: { fontSize: 22 },
  featureText: { flex: 1, gap: 2 },
  featureTitle: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '700',
  },
  featureSub: {
    color: COLORS.textLightMuted,
    fontSize: 11,
  },
  featureCheck: {
    color: COLORS.premiumGold,
    fontSize: 16,
    fontWeight: '900',
  },
  // Products
  productsSection: { gap: 14 },
  productsSectionTitle: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
  },
  loadingProducts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 24,
  },
  loadingProductsText: {
    color: COLORS.textLightMuted,
    fontSize: 14,
  },
  noProducts: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  noProductsText: {
    color: COLORS.textLightMuted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  retryBtn: {
    backgroundColor: COLORS.emberGlow,
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  retryBtnText: {
    color: COLORS.ember,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  productList: { gap: 10 },
  productCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productCardSelected: {
    borderColor: COLORS.premiumGold,
    backgroundColor: COLORS.premiumGoldGlow,
  },
  bestValueBadge: {
    position: 'absolute',
    top: -8,
    left: 16,
    backgroundColor: COLORS.premiumGold,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  bestValueText: {
    color: COLORS.obsidian,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  productLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  productRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.obsidianBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productRadioSelected: {
    borderColor: COLORS.premiumGold,
  },
  productRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.premiumGold,
  },
  productTitle: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '700',
  },
  productDesc: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    marginTop: 2,
  },
  productPrice: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '900',
  },
  productPeriod: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textLightMuted,
  },
  errorBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 8,
    padding: 12,
  },
  errorText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
  finePrint: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    opacity: 0.6,
  },
  // Bottom
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: COLORS.obsidian,
    borderTopWidth: 1,
    borderTopColor: COLORS.obsidianBorder,
    gap: 12,
  },
  subscribeBtn: {
    backgroundColor: COLORS.premiumGold,
    borderRadius: 8,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: COLORS.premiumGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  subscribeBtnDisabled: {
    backgroundColor: COLORS.obsidianBorder,
    shadowOpacity: 0,
    elevation: 0,
  },
  subscribeBtnText: {
    color: COLORS.obsidian,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
  },
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  restoreText: { color: COLORS.textLightMuted, fontSize: 12, fontWeight: '600' },
  notNowText: { color: COLORS.textLightMuted, fontSize: 12, fontWeight: '600' },
  // Already premium
  alreadyPremium: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  alreadyPremiumIcon: { fontSize: 64 },
  alreadyPremiumTitle: {
    color: COLORS.premiumGold,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
  },
  alreadyPremiumSub: {
    color: COLORS.textLightMuted,
    fontSize: 14,
    textAlign: 'center',
  },
  doneBtn: {
    backgroundColor: COLORS.premiumGold,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  doneBtnText: {
    color: COLORS.obsidian,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
});

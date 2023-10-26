import styles from "./PayscreenStyles";
import { Text, View, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const Payscreen = () => {
    // State to hold the duration of the membership
    const [paymentDuration, setPaymentDuration] = useState<string>("yearly");

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.columnContainer}>
                <Text style={styles.title}>Unlimited Access to Somatics.</Text>
                <Text style={styles.subtitle}>Cancel anytime.</Text>
                <View style={[styles.fact, styles.firstFact]}>
                    <AntDesign name="check" size={24} color="#EF6F13" />
                    <Text style={styles.factText}>Over 250 dedicated workouts and programs</Text>
                </View>
                <View style={styles.fact}>
                    <AntDesign name="check" size={24} color="#EF6F13" />
                    <Text style={styles.factText}>Over 500 exercises and technique guides</Text>           
                </View>
                <View style={styles.paymentList}>
                    <TouchableWithoutFeedback onPress={() => setPaymentDuration('yearly')}>
                        <View
                            style={paymentDuration == 'yearly' ? [styles.paymentType, styles.selectedPayment] : [styles.paymentType]}
                        >
                            <View style={paymentDuration == 'yearly' ? [styles.savings, styles.selectedSavings] : [styles.savings]}>
                                <Text style={styles.savingsText}>SAVE 29.89 PER YEAR</Text>
                            </View>
                            <Text style={styles.duration}>YEARLY</Text>
                            <Text style={styles.price}>$89.99</Text>
                            <Text style={styles.extraInfo}>Equivalent of $7.49 / month</Text>
                        </View>
                    </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback onPress={() => setPaymentDuration('monthly')}>
                        <View
                            style={paymentDuration == 'monthly' ? [styles.paymentType, styles.selectedPayment] : [styles.paymentType]}
                        >
                            <Text style={styles.duration}>MONTHLY</Text>
                            <Text style={styles.price}>$9.99</Text>
                            <Text style={styles.extraInfo}>Paid monthly</Text>                           
                        </View>
                    </TouchableWithoutFeedback>               
                </View>
                <View>
                    <Text style={styles.restorePurchase}>Restore Purchase</Text>
                </View>
                <TouchableOpacity style={styles.upgradeButton}>
                    <Text style={styles.upgradeText}>UPGRADE NOW</Text>
                </TouchableOpacity>
                <View style={styles.terms}>
                    <Text style={styles.termsText}>By subscribing you agree to our </Text>
                    <Text style={[styles.termsText, styles.underline]}>Terms & Conditions</Text>
                </View>
            </SafeAreaView>
        </View>
    )
};

export default Payscreen;

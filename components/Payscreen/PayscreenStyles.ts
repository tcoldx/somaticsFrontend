import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0C0C0C",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 200,
        height: "100%",
        width: "100%"
    },
    columnContainer: {
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 60
    },
    subtitle: {
        color: "grey",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 10
    },
    firstFact: {
        marginTop: 20
    },
    fact: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginLeft: 30, 
    },
    factText: {
        marginLeft: 10,
        color: "white"    
    },
    paymentList: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 20,    
    },
    paymentType: {
        borderColor: "rgba(128, 128, 128, 0.2)",
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 1,
        width: "45%",
        overflow: "hidden"
    },
    selectedPayment: {
        borderColor: "#EF6F13",
        backgroundColor: "rgba(239, 112, 21, 0.1)",
    },
    savings: {
        backgroundColor: "rgba(128, 128, 128, 0.2)",
        justifyContent: "center",
        padding: 10
    },
    selectedSavings: {
        backgroundColor: "#EF6F13"
    },
    savingsText: {
        color: "white",
        fontWeight: "600",
        fontSize: 10,
    },
    duration: {
        color: "white",
        marginTop: 10,
        marginLeft: 10,
        fontSize: 10,
        fontWeight: "600",
    },
    price: {
        color: "white",
        fontWeight: "600",
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
    },
    extraInfo: {
        color: "grey",
        margin: 10,
        fontSize: 10,
    },
    restorePurchase: {
        color: "grey",
        marginTop: 20,
        fontWeight: "600"
    },
    upgradeButton: {
        width: "90%",
        borderRadius: 30,
        backgroundColor: "#EF6F13",
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "auto"
    },
    upgradeText: {
        color: "white",
        fontWeight: "600",
    },
    terms: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
    },
    termsText: {
        color: "grey"
    },
    underline: {
        textDecorationLine: "underline"
    },
});

export default styles;

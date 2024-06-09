import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import type { MultiStepAuthProviderType } from "../../../../wallets/in-app/core/authentication/type.js";
import type { Wallet } from "../../../../wallets/interfaces/wallet.js";
import { parseTheme } from "../../../core/design-system/CustomThemeProvider.js";
import type { ConnectButtonProps } from "../../../core/hooks/connection/ConnectButtonProps.js";
import {
  useActiveWallet,
  useDisconnect,
} from "../../../core/hooks/wallets/wallet-hooks.js";
import { ThemedButton } from "../components/button.js";
import { ThemedText } from "../components/text.js";
import { ConnectModal } from "./ConnectModal.js";

export type ModalState =
  | { screen: "base" }
  | { screen: "otp"; auth: MultiStepAuthProviderType; wallet: Wallet<"inApp"> }
  | { screen: "external_wallets" };

export function ConnectButton(props: ConnectButtonProps) {
  const theme = parseTheme(props.theme);
  const [visible, setVisible] = useState(false);
  const wallet = useActiveWallet();

  const fadeAnim = useRef(new Animated.Value(0)).current; // For background opacity
  const slideAnim = useRef(new Animated.Value(screenHeight)).current; // For bottom sheet position

  const openModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: screenHeight - modalHeight,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start(() => {
      setVisible(false);
      fadeAnim.setValue(0);
      slideAnim.setValue(screenHeight);
    });
  };

  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible, openModal, closeModal]);

  return wallet ? (
    <ConnectedButton onClose={closeModal} {...props} />
  ) : (
    <View>
      <ThemedButton theme={theme} onPress={() => setVisible(true)}>
        <ThemedText
          theme={theme}
          type="defaultSemiBold"
          style={{ color: theme.colors.primaryButtonText }}
        >
          Connect Wallet
        </ThemedText>
      </ThemedButton>
      <Modal
        visible={visible}
        animationType="none"
        transparent={true}
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <Pressable style={styles.dismissArea} onPress={closeModal} />
        </Animated.View>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <ConnectModal {...props} theme={theme} onClose={closeModal} />
        </Animated.View>
      </Modal>
    </View>
  );
}

function ConnectedButton(props: ConnectButtonProps & { onClose: () => void }) {
  const theme = parseTheme(props.theme);
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  return (
    wallet && (
      <ThemedButton
        theme={theme}
        onPress={() => {
          props.onClose();
          disconnect(wallet);
        }}
      >
        <ThemedText
          theme={theme}
          type="defaultSemiBold"
          style={{ color: theme.colors.primaryButtonText }}
        >
          Disconnect
        </ThemedText>
      </ThemedButton>
    )
  );
}

const screenHeight = Dimensions.get("window").height;
const modalHeight = 480;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  dismissArea: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bottomSheetContainer: {
    position: "absolute",
    height: modalHeight,
    width: screenWidth,
    top: 0,
    flexDirection: "column",
  },
});

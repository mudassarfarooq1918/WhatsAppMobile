import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateAndLogin = () => {
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      // Proceed with login
      console.log('Logging in with', {email, password});
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Welcome Back</Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon
            name="email-outline"
            size={22}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor={'gray'}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon
            name="lock-outline"
            size={22}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            style={styles.input}
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#888"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {/* Login Button */}
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={validateAndLogin}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginHorizontal: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 12,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  switchText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    color: '#3b5998',
    fontWeight: '600',
  },
});

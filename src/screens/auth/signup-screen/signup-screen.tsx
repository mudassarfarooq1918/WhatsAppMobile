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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validate = () => {
    let valid = true;
    let newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      newErrors.email = 'Email is invalid.';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = () => {
    if (validate()) {
      Alert.alert('Success', 'Account created successfully!');
      // Proceed with signup logic
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Create Account</Text>
        </View>

        {/* Full Name */}
        <View style={styles.inputContainer}>
          <Icon
            name="account-outline"
            size={22}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={text => {
              setFullName(text);
              setErrors({...errors, fullName: ''});
            }}
            style={styles.input}
            placeholderTextColor="gray"
          />
        </View>
        {errors.fullName ? (
          <Text style={styles.errorText}>{errors.fullName}</Text>
        ) : null}

        {/* Email */}
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
            onChangeText={text => {
              setEmail(text);
              setErrors({...errors, email: ''});
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="gray"
          />
        </View>
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        {/* Password */}
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
            onChangeText={text => {
              setPassword(text);
              setErrors({...errors, password: ''});
            }}
            secureTextEntry={hidePassword}
            style={styles.input}
            placeholderTextColor="gray"
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
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Icon
            name="lock-check-outline"
            size={22}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setErrors({...errors, confirmPassword: ''});
            }}
            secureTextEntry={hideConfirmPassword}
            style={styles.input}
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
            <Icon
              name={hideConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#888"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleSignup}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Already have account */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#000',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  button: {
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchText: {
    fontSize: 14,
    color: '#555',
  },
  linkText: {
    fontSize: 14,
    color: '#3b5998',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 12,
  },
});

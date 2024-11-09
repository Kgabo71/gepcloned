import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 340, 
    height: 340,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 14,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#006bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    width:16,
    borderRadius:50,
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#007bff',
    fontSize: 14,
    
   // textDecorationLine: 'underline',
  },
  signInButton: {
    color:'#006hff',
    marginTop: 20,
    borderRadius: 5,
  },
  signInButtonText: {
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default styles;

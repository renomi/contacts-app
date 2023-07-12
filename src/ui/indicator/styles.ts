import { StyleSheet } from 'react-native';

export const indicatorStyles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#303030',
    textAlign: 'center',
  },
  message: {
    maxWidth: 300,
    color: '#404040',
  },
  btn: {
    marginTop: 12,
  },
  spinner: {
    marginVertical: 12,
  },
  errorContainer: {
    zIndex: 2,
    position: 'absolute',
    alignItems: 'center',
    top: 95,
    alignSelf: 'center',
    padding: 8,
    backgroundColor: 'rgb(255, 218, 214)',
    borderRadius: 12,
  },
});

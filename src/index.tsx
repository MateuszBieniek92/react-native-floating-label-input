import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  NativeModules,
  TextInputProps,
} from 'react-native';
import { styles } from './styles';

import makeVisibleWhite from './assets/make_visible_white.png';
import makeInvisibleWhite from './assets/make_invisible_white.png';
import makeVisibleBlack from './assets/make_visible_black.png';
import makeInvisibleBlack from './assets/make_invisible_black.png';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props extends TextInputProps {
  /**Style to the container of whole component*/
  containerStyles?: Object;
  /**Changes the color for hide/show password image*/
  darkTheme?: true | false | undefined;
  /**Value for the label, same as placeholder */
  label: string;
  /**Style to the label */
  labelStyles?: Object;
  /**Set this to true if is password to have a show/hide input and secureTextEntry automatically*/
  isPassword?: true | false | undefined;
  /**Callback for action submit on the keyboard */
  onSubmit?: Function;
  /**Style to the show/hide password container */
  showPasswordContainerStyles?: Object;
  /**Style to the show/hide password image */
  showPasswordImageStyles?: Object;
  /**Style to the input */
  inputStyles?: Object;
  /**Path to your custom image for show/hide input */
  customShowPasswordImage?: string;
  /**Custom Style for position, size and color for label, when it's focused or blurred*/
  customLabelStyles?: {
    leftFocused: 0;
    leftBlurred: 0;
    topFocused: 0;
    topBlurred: 10;
    fontSizeFocused: 10;
    fontSizeBlurred: 14;
    colorFocused: '#00B6E8',
    colorBlurred: '#7F7F7F',
  };
  noBorder?: true | false;
  /**Required if onFocus or onBlur is overrided*/
  isFocused: boolean;
  /**Ref to FloatingLabelInput*/
}

interface InputRef {
  focus(): void;
}

const FloatingLabelInput: React.RefForwardingComponent<InputRef, Props> = (
  props,
  ref,
) => {
  const [isFocused, setIsFocused] = useState(props.value !== '' ? true : false);
  const [secureText, setSecureText] = useState(true);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    LayoutAnimation.spring();
    setIsFocused(props.isFocused);
  }, [props.isFocused]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  function handleFocus() {
    LayoutAnimation.spring();
    setIsFocused(true);
  }

  function handleBlur() {
    if (props.value === '' || props.value == null) {
      LayoutAnimation.spring();
      setIsFocused(false);
    }
  }

  function setFocus() {
    inputRef.current?.focus();
  }

  function _toggleVisibility() {
    if (secureText) {
      setSecureText(false);
    } else {
      setSecureText(true);
    }
  }

  function onSubmitEditing() {
    if (props.onSubmit !== undefined) {
      props.onSubmit();
    }
  }

  let imgSource = props.darkTheme
    ? secureText
      ? makeVisibleBlack
      : makeInvisibleBlack
    : secureText
    ? makeVisibleWhite
    : makeInvisibleWhite;

  const customLabelStyles = {
    leftFocused: 0,
    leftBlurred: 0,
    topFocused: -3,
    topBlurred: 12.5,
    fontSizeFocused: 10,
    fontSizeBlurred: 14,
    colorFocused: '#00B6E8',
    colorBlurred: '#7F7F7F',
    ...props.customLabelStyles,
  };

  const style: Object = {
    zIndex: 3,
    position: 'absolute',
    left: !isFocused
      ? customLabelStyles.leftBlurred
      : customLabelStyles.leftFocused,
    top: !isFocused
      ? customLabelStyles.topBlurred
      : customLabelStyles.topFocused,
    fontSize: !isFocused
      ? customLabelStyles.fontSizeBlurred
      : customLabelStyles.fontSizeFocused,
    color: !isFocused
      ? customLabelStyles.colorBlurred
      : customLabelStyles.colorFocused,
    ...props.labelStyles,
  };

  const input: Object = {
    color: customLabelStyles.colorFocused,
    ...styles.input,
    ...props.inputStyles,
  };

    const noBorder: Object = {
        ...styles.noBorder,
    };

    const grayText: Object = {
        color: customLabelStyles.colorFocused,
        ...styles.grayText,
    };

  const containerStyles: Object = {
    height: 45,
    color: '#000000',
    backgroundColor: '#00000000',
    alignContent: 'center',
    justifyContent: 'center',
    ...props.containerStyles,
  };

  const containerInput = {
      borderColor: isFocused ? '#00B6E8' : '#F2F2F2',
      borderBottomWidth: 1,
    ...styles.containerInput,
  };

  const toggleButton = {
    ...styles.toggleButton,
    ...props.showPasswordContainerStyles,
  };

  const img = {
    ...styles.img,
    ...props.showPasswordImageStyles,
  };

  return (
    <View style={containerStyles}>
      <Text onPress={setFocus} style={[style, props.noBorder ? grayText : null]}>
        {props.label}
      </Text>
      <View style={[containerInput, props.noBorder ? noBorder : null]}>
        <TextInput
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={
            props.isPassword !== undefined
              ? props.isPassword && secureText
              : false
          }
          style={input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          {...props}
          placeholder=""
        />
        {props.isPassword ? (
          <TouchableOpacity style={toggleButton} onPress={_toggleVisibility}>
            <Image
              source={
                props.customShowPasswordImage !== undefined
                  ? props.customShowPasswordImage
                  : imgSource
              }
              resizeMode="contain"
              style={img}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default forwardRef(FloatingLabelInput);

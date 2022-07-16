import React from 'react';
import ar from 'Cards/src/services/translation/ar.json';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import _ from 'lodash';

/**
 * Available languages.
 */
const languages = {
  ar,
};

/**
 *
 */
export const useLangcode = () => {
  const langcode = useSelector((state) => state.langCode);
  console.log("langcodeee", langcode)
  return langcode;
};

/**
 *
 */
export const useTranslation = () => {
  const langcode = useLangcode();

  /**
   *
   * @param {string} string
   * @param {object} params
   * @param {import('react-native').TextStyle} textStyle
   */
  const t = (string, params = {}, textStyle = {}) => {
    const translation = languages[langcode]
      ? languages[langcode][string]
      : null;

    /**
     * @type {string}
     */
    let returnedTranslation = translation ? translation : string;

    // Replace the params.
    _.forEach(params, (replacement, token) => {
      const fragments = returnedTranslation.split(`@${token}`);
      fragments.splice(1, 0, replacement);
      returnedTranslation = fragments;
    });

    /**
     * This allows the replacement of texts with Text components
     */
    if (returnedTranslation instanceof Array) {
      return returnedTranslation.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <Text key={index} style={textStyle}>
              {item}
            </Text>
          );
        } else {
          return <React.Fragment key={index}>{item}</React.Fragment>;
        }
      });
    } else {
      return returnedTranslation;
    }
  };

  return t;
};

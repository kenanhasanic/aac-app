import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Custom Cards', value: '1'},
  {label: 'Generic Cards', value: '2'},
  {label: 'All Cards', value: '3'},
];

const DropdownListType = ({setStreamType}: any) => {
  const [value, setValue] = useState('1');

  useEffect(() => {
    setStreamType(value);
  }, [value]);

  return (
    <Dropdown
      style={[styles.dropdown, {width: '100%'}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Grid"
      searchPlaceholder="Search..."
      value={value}
      itemTextStyle={styles.itemText}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default DropdownListType;

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    margin: 16,
    height: 40,
    borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
    textDecorationColor: 'black',
  },
  itemText: {
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});

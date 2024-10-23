import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
];

const DropdownComponentGrid = ({setGridSize}: any) => {
  const [value, setValue] = useState('3');

  useEffect(() => {
    setGridSize(value);
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

export default DropdownComponentGrid;

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    margin: 16,
    borderBottomColor: 'gray',
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

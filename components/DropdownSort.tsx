import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import CardData from '../static/cardInterface';

const data = [
  {label: 'Basic Needs', value: 'Basic Needs'},
  {label: 'Feelings and Emotions', value: 'Feelings and Emotions'},
  {label: 'People', value: 'People'},
  {label: 'Actions', value: 'Actions'},
  {label: 'Social Interaction', value: 'Social Interaction'},
  {label: 'Places', value: 'Places'},
  {label: 'Descriptive Words', value: 'Descriptive Words'},
  {label: 'Favorites', value: 'Favorites'},
];

const DropdownSort = ({setDisplayedCards, displayedCards}: any) => {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    const sortedCards = sortDisplayedCards(value, displayedCards);
    setDisplayedCards(sortedCards);
  }, [value]);

  const sortDisplayedCards = (value: any, displayedCards: CardData[]) => {
    const sortedCards = [...displayedCards].sort((a, b) => {
      if (a.category === value && b.category !== value) {
        return -1; // Place matching category first
      }
      if (a.category !== value && b.category === value) {
        return 1; // Place non-matching categories later
      }
      return 0; // Keep other items in the same order
    });
    return sortedCards;
  };

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
      placeholder="Sort by category"
      searchPlaceholder="Search..."
      value={value}
      itemTextStyle={styles.itemText}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default DropdownSort;

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
    color: 'tomato',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'tomato',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontStyle: 'italic',
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

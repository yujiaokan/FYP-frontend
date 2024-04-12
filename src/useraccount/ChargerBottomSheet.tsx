import BottomSheet, { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export default function ChargerBottomSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  const handleSheetChanges = (index: number) => {
    console.log('handleSheetChanges', index);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => bottomSheetRef.current?.expand()}
        title="Open Bottom Sheet"
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>Swipe down to close</Text>
      
        </View>
      </BottomSheet>
    </View>
  );
}

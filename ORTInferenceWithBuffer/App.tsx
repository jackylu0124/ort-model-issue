/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {type PropsWithChildren} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button,
   Alert,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 import * as ort from "onnxruntime-react-native";
 import { Env, Tensor } from "onnxruntime-react-native";
 import { Buffer } from "buffer";
 
 function HexStrToUint8Array(hexStr: string) {
   const arr = new Uint8Array(hexStr.length/2);
   for (let i = 0; i < hexStr.length/2; i++) {
     const current_uint8 = parseInt(hexStr.substring(2*i, 2*i+2), 16);
     arr[i] = current_uint8;
   }
   return arr;
 }
 
 async function createAndRunInferenceSessionWithUin8Array() {
   // "onnx_models_optimized/FindCountOfThree_v001.ort" is read with Python in binary mode and its content is then written in hex mode into "onnx_hex_files/FindCountOfThree_v001.txt", the
   // string below is directly copied from "onnx_hex_files/FindCountOfThree_v001.txt"
   const FindCountOfThree_v001_model_hex_str = "180000004f52544d0000000000000a0010000c00080004000a0000000c00000080000000ac0d00009cf5ffff0c0000000400000000000000acf5ffff380000000400000005000000d8268cf37a1ee643b82b630e62008e5dd8268cf37a1ee643402f4e729d377d82d8268cf37a1ee6430000000005000000000000000100000003000000040000000500000014002c0020001c00180014001000080000000400140000003c000000ffffffffffffff7f000d0000040d00000c0d0000580b00000700000000000000000000001400240020001c001800140010000c000800040014000000bc0a0000040b0000140b000014000000060000002400000090040000980a00000500000084030000a8020000d0010000d00000001c00000005000000ac030000e0020000e8010000e8000000280000008afdffff050000000c00000004000000000000000100000004000000000000000000000072fdffff580000005800000028000000580000005c000000e0030000f8030000050000000d000000300c00004c0000005000000001000000040000008efcffff060000000000000000000000020000000400000002000000746f000000000000010000000100000001000000300a00000100000040060000000000000000000006000000436173745f3600003afeffff04000000180000000400000001000000050000000000000000000000010000000300000000000000000000002efeffff80000000800000002800000084000000880000002403000088000000040000000d000000740b0000880000008c00000002000000300000000400000006f9ffff0200000004000000140000006e6f6f705f776974685f656d7074795f61786573000000002ef9ffff0200000004000000080000006b65657064696d730000000000000000020000000100000000000000010000006005000001000000cc0800000900000052656475636553756d00000000000000000000000b00000052656475636553756d5f350036ffffff03000000180000000400000001000000040000000000000000000000010000000100000000000000000000002affffff64000000640000002800000064000000680000002802000040020000030000000d000000780a0000580000005c000000010000001400000000000e001400100000000c00000004000e0000000700000000000000020000000400000002000000746f000000000000010000000100000001000000f807000001000000bc060000000000000000000006000000436173745f34000000000a001000040008000c000a000000010000001800000004000000010000000300000000000000000000000100000000000000000000000000000000001e00340030002c002800240020001c0000001800140010000c00080004001e000000340000003400000028000000380000003c0000003401000040000000010000000d000000840900003c00000040000000000000000000000002000000010000000100000001000000fc0500000200000040030000e004000005000000457175616c000000000000000000000007000000457175616c5f320000000a000c000000040008000a0000001800000004000000010000000100000000000000000000000000000000001e0030002c0028002400200000001c0000001800140010000c00080004001e00000064000000640000002400000064000000680000006c000000840000000d000000c00800008400000088000000010000001400000000000e001800140000001000000004000e000000070000000000000000000000020000000400000002000000746f0000000000000100000001000000010000005402000001000000bc06000014000000435055457865637574696f6e50726f766964657200000000040000004361737400000000000000000000000006000000436173745f30000008000000d8040000c403000074030000840200003c02000008020000080100000400000062fcffff08000000e400000046fbffff08000000000000013cfbffff09000000040000007afaffff0400000004000000a00000006c000000380000000400000096faffff04000000cefaffff000000020400000014000000696e7075745f64796e616d69635f617865735f3300000000c6faffff04000000fefaffff000000020400000014000000696e7075745f64796e616d69635f617865735f3200000000f6faffff040000002efbffff000000020400000014000000696e7075745f64796e616d69635f617865735f310000000026fbffff0400000058fcffff000000010100000000000000000000000c0000006f6e6e783a3a436173745f340000000062fdffff08000000e000000046fcffff08000000000000013cfcffff07000000040000007afbffff0400000004000000a00000006c000000380000000400000096fbffff04000000cefbffff000000020400000014000000696e7075745f64796e616d69635f617865735f3300000000c6fbffff04000000fefbffff000000020400000014000000696e7075745f64796e616d69635f617865735f3200000000f6fbffff040000002efcffff000000020400000014000000696e7075745f64796e616d69635f617865735f310000000026fcffff0400000020fcffff0000000101000000000000000d0000006f6e6e783a3a457175616c5f310000005efeffff080000004004000042fdffff080000000000000138fdffff060000000400000076fcffff04000000000000008efeffff080000002800000072fdffff080000000000000168fdffff0700000004000000a6fcffff04000000000000000c0000006f6e6e783a3a436173745f3600000000d2feffff08000000e0030000b6fdffff0800000000000001acfdffff0600000004000000eafcffff0400000004000000a00000006c000000380000000400000006fdffff040000003efdffff000000020400000014000000696e7075745f64796e616d69635f617865735f330000000036fdffff040000006efdffff000000020400000014000000696e7075745f64796e616d69635f617865735f320000000066fdffff040000009efdffff000000020400000014000000696e7075745f64796e616d69635f617865735f310000000096fdffff04000000c8feffff00000001010000000000000000000000beffffff0800000028000000a2feffff080000000000000198feffff0700000004000000d6fdffff04000000000000000d0000006f6e6e783a3a457175616c5f32000a000c000800000004000a00000008000000ec000000eefeffff0800000000000001e4feffff090000000400000022feffff0400000004000000a00000006c00000038000000040000003efeffff0400000076feffff000000020400000014000000696e7075745f64796e616d69635f617865735f33000000006efeffff04000000a6feffff000000020400000014000000696e7075745f64796e616d69635f617865735f32000000009efeffff04000000d6feffff000000020400000014000000696e7075745f64796e616d69635f617865735f3100000000cefeffff0c000000080014000700080008000000000000010100000000000000000000000c0000006f6e6e783a3a436173745f3300000a000e000800000004000a000000140000001001000000000a000c0000000b0004000a000000100000000000000108000c000400080008000000070000000400000046ffffff0400000004000000b400000070000000380000000400000062ffffff040000009affffff000000020400000014000000696e7075745f64796e616d69635f617865735f330000000092ffffff04000000caffffff000000020400000014000000696e7075745f64796e616d69635f617865735f32000006000a000400060000001000000000000a000c000700000008000a000000000000020400000014000000696e7075745f64796e616d69635f617865735f310000060008000400060000000c000000080010000700080008000000000000010100000000000000110000006f6e6e783a3a52656475636553756d5f3500000001000000180000000000000000000e001400100000000c00080004000e00000010000000070000001400000014000000080000000300000000000000000000000d0000006f6e6e783a3a457175616c5f32000000010000000400000005000000636f756e74000000010000000400000005000000696e70757400000009000000840100005001000024010000f0000000c400000090000000640000003000000004000000d8feffff010000000000000004000000100000006f72672e7079746f7263682e6174656e0000000000ffffff0100000000000000040000001a000000636f6d2e6d6963726f736f66742e6578706572696d656e74616c000000ffffff010000000000000000000000040000000d000000636f6d2e6d6963726f736f667400000058ffffff0100000000000000040000001800000061692e6f6e6e782e707265766965772e747261696e696e670000000088ffffff0100000000000000040000001000000061692e6f6e6e782e747261696e696e670000000080ffffff1100000000000000000000000400000014000000636f6d2e6d732e696e7465726e616c2e6e68776300000000e0ffffff0300000000000000040000000a00000061692e6f6e6e782e6d6c0000080010000c0004000800000001000000000000000400000013000000636f6d2e6d6963726f736f66742e6e63687763000800140010000400080000000e000000000000000000000004000000000000000000000006000000312e31312e300000070000007079746f726368000100000034000000";
   const FindCountOfThree_v001_model_uint8_arr = HexStrToUint8Array(FindCountOfThree_v001_model_hex_str);
   ort.InferenceSession.create(FindCountOfThree_v001_model_uint8_arr).then(async (FindCountOfThree_session) => {
     console.log("Initializing inference session with Uint8Array succeeded.");
     const input = new Tensor("int32", new Int32Array(1 * 3 * 256 * 256).fill(3), [1, 3, 256, 256]);
     const count = (await FindCountOfThree_session.run({"input": input})).count;
     console.log("count.data:", count.data);
   }).catch((e) => {
     console.log("Initializing inference session with Uint8Array failed.");
     console.log(e);
   });
 }
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         
         <View style={{flexDirection: "column", justifyContent: "space-between"}}>
           <Text style={styles.sectionDescription}>Click button below to test creating and running inference session with a Uint8Array</Text>
           <Button title="Create and run inference session with Uint8Array!" onPress={createAndRunInferenceSessionWithUin8Array}></Button>
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 
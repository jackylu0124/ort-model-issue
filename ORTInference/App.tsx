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
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Env, Tensor} from "onnxruntime-react-native";
import * as ort from "onnxruntime-react-native";
import RNFS, { ReadDirItem } from "react-native-fs"

async function printDirItems(tag: string) {
  try {
    const dirItems = await RNFS.readDir(RNFS.TemporaryDirectoryPath);
    // print out all the content inside the temporary directory
    console.log(tag, "*************************************************");
    console.log(tag, "Content inside the temporary directory:");
    for (const item of dirItems) {
      console.log(item);
    }
    console.log(tag, "*************************************************");
  } catch (e) {
    console.log(tag, "Error Message:", e);
  }
}

async function clearONNXModels() {
  const tag = "Clearing ONNX models:";
  try {
    const dirItems = await RNFS.readDir(RNFS.TemporaryDirectoryPath);
    for (const item of dirItems) {
      if (item.name.endsWith(".ort")) {
        const itemPath = item.path;
        await RNFS.unlink(itemPath);
        console.log(tag, `${itemPath} deleted!`);
      }
    }
  } catch (e) {
    console.log(tag, "Error Message:", e);
  }
}

async function run_inference() {
  const tag = "FindCountOfThree:";
  try {
    const dest = RNFS.TemporaryDirectoryPath+"/FindCountOfThree_v001.ort";
    await RNFS.downloadFile({fromUrl: Image.resolveAssetSource(require("./onnx_models/FindCountOfThree_v001.ort")).uri, toFile: dest});

    await printDirItems(tag);

    const session: ort.InferenceSession = await ort.InferenceSession.create("file://"+dest);
    console.log(tag, "Inference session initialized!");
    console.log(tag, session);

    const input = new Tensor("int32", new Int32Array(1 * 3 * 256 * 256).fill(3), [1, 3, 256, 256]);
    const outputs = await session.run({"input": input});
    console.log(tag, "outputs.count.dims:", outputs.count.dims);
    console.log(tag, "outputs.count.data:", outputs.count.data);
  } catch (e) {
    console.log(tag, "Error Message:", e);
  }
}

const ONNXInferenceTest = () => {
  return (
    <View>
      <Button title="Start Inference" onPress={async () => {
        
        console.log("\n\n\nButton is clicked!!!");
        // await clearONNXModels();
        // await printDirItems("Main inference function:");

        await run_inference();

      }}></Button>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <ONNXInferenceTest />
        <Image source={require("./onnx_models/simpson.jpg")}/>
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

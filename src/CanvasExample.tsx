import _ from 'lodash';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {canvasHeight, canvasWidth} from './CanvasExamples/CanvasUtils';
import {useColoredPixels} from './CanvasExamples/ColoredPixels';
import {useFur} from './CanvasExamples/Fur';
import {useRainbow} from './CanvasExamples/Rainbow';
import {useShadows} from './CanvasExamples/Shadows';
import {useShapes} from './CanvasExamples/Shapes';
import {useSimplePencil} from './CanvasExamples/SimplePencil';
import {useSpray} from './CanvasExamples/Spray';
import ReactNativeCanvas from 'react-native-canvas';,

const CanvasExample = () => {
  const canvasRef: any = React.useRef(null);

  // React State
  const [strokeType, setStrokeType] = React.useState('simplePencil');

  // Examples Hooks
  const coloredPixels = useColoredPixels();
  const fur = useFur();
  const rainbow = useRainbow();
  const shadows = useShadows();
  const shapes = useShapes();
  const simplePencil = useSimplePencil();
  const spray = useSpray();

  const onCanvasCreate = canvas => {
    if (canvasRef.current) {
      return;
    }
    canvasRef.current = canvas;
    if (Platform.OS === 'web') {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
    } else {
      canvasRef.current.height = canvasHeight;
      canvasRef.current.width = canvasWidth;
    }
  };

  const startDraw = event => {
    console.log('canvasRef.current');
    console.log(canvasRef.current);
    if (_.camelCase(strokeType) === 'simplePencil') {
      simplePencil.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'shadows') {
      shadows.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'coloredPixels') {
      coloredPixels.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'fur') {
      fur.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'rainbow') {
      rainbow.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'shapes') {
      shapes.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'spray') {
      spray.startDraw(canvasRef.current, event);
    }
  };

  const draw = event => {
    if (_.camelCase(strokeType) === 'simplePencil') {
      simplePencil.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'shadows') {
      shadows.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'coloredPixels') {
      coloredPixels.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'fur') {
      fur.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'rainbow') {
      rainbow.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'shapes') {
      shapes.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'spray') {
      spray.draw(canvasRef.current, event);
    }
  };

  const exitDraw = event => {
    if (_.camelCase(strokeType) === 'simplePencil') {
      simplePencil.exitDraw();
    } else if (_.camelCase(strokeType) === 'shadows') {
      shadows.exitDraw();
    } else if (_.camelCase(strokeType) === 'coloredPixels') {
      coloredPixels.exitDraw();
    } else if (_.camelCase(strokeType) === 'fur') {
      fur.exitDraw();
    } else if (_.camelCase(strokeType) === 'rainbow') {
      rainbow.exitDraw();
    } else if (_.camelCase(strokeType) === 'shapes') {
      shapes.exitDraw();
    } else if (_.camelCase(strokeType) === 'spray') {
      spray.exitDraw();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.canvasContainer}>
        <View
          onStartShouldSetResponder={evt => {
            console.log('onStartShouldSetResponder');
            startDraw(evt);
            return true;
          }}
          onResponderMove={evt => {
            console.log('onResponderMove');
            draw(evt);
          }}
          onResponderRelease={evt => {
            console.log('onResponderRelease');
            exitDraw(evt);
          }}>
          <ReactNativeCanvas
            ref={onCanvasCreate}
            style={{
              backgroundColor: 'yellow',
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('simplePencil');
          }}
          style={styles.button}>
          <Text>Simple Pencil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('coloredPixels');
          }}
          style={styles.button}>
          <Text>Colored Pixels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('fur');
          }}
          style={styles.button}>
          <Text>Fur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('rainbow');
          }}
          style={styles.button}>
          <Text>Rainbow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('shadows');
          }}
          style={styles.button}>
          <Text>Shadows</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('shapes');
          }}
          style={styles.button}>
          <Text>Shapes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('spray');
          }}
          style={styles.button}>
          <Text>Spray</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            const context = canvasRef?.current.getContext('2d');
            if (context) {
              context.clearRect(0, 0, canvasWidth, canvasHeight);
            }
          }}
          style={styles.button}>
          <Text>CLEAR CANVAS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '5%',
  },
  canvasContainer: {
    borderWidth: 10,
  },
  safeAreaView: {
    alignItems: 'center',
  },
});

export default CanvasExample;

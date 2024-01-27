import React, {useState} from 'react';
import {ColorValue, StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Circle, G, Path, Text as SvgText} from 'react-native-svg';
import {WIDTH_SCREEN} from '../../../../Common/Dimentions';
import Colors from '../../../../Common/Colors';
import {Text} from 'react-native';
import Theme from '../../../../Common/Theme';

interface DonutChartProps {
  donutLength?: number;
  donVi?: string;
  data: {
    id?: number;
    teN_BD: string;
    teN_ND?: string;
    giA_TRI: number;
    phaN_TRAM: number;
    color: string;
    typE_BD?: number;
  }[];
}

const SIZE = WIDTH_SCREEN / 2.5;

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  donVi = '',
  donutLength = 2,
}) => {
  const total = data.reduce((acc, value) => acc + value.phaN_TRAM, 0);
  let startAngle = 0;

  const totalGiaTri = data.reduce((acc, item) => acc + item.giA_TRI, 0);

  const renderSlice = (
    value: number,
    color: ColorValue | undefined,
    index: number,
    TEN: string,
  ) => {
    const angle = (value / total) * 360;
    const endAngle = startAngle + angle;

    const outerRadius = 100;
    const innerRadius = 80;

    // Kiểm tra giá trị không hợp lệ
    if (isNaN(angle) || isNaN(startAngle) || isNaN(endAngle)) {
      return null;
    }

    const x1Outer = Math.cos((startAngle * Math.PI) / 180) * outerRadius;
    const y1Outer = Math.sin((startAngle * Math.PI) / 180) * outerRadius;
    const x2Outer = Math.cos((endAngle * Math.PI) / 180) * outerRadius;
    const y2Outer = Math.sin((endAngle * Math.PI) / 180) * outerRadius;

    const x1Inner = Math.cos((startAngle * Math.PI) / 180) * innerRadius;
    const y1Inner = Math.sin((startAngle * Math.PI) / 180) * innerRadius;
    const x2Inner = Math.cos((endAngle * Math.PI) / 180) * innerRadius;
    const y2Inner = Math.sin((endAngle * Math.PI) / 180) * innerRadius;

    const textAngle = startAngle + angle / 2;

    // const textX =
    //   (Math.cos((textAngle * Math.PI) / 180) * (outerRadius + innerRadius)) / 2;
    // const textY =
    //   (Math.sin((textAngle * Math.PI) / 180) * (outerRadius + innerRadius)) / 2;

    startAngle = endAngle;

    const textX = 0;
    const textY = value > 50 ? -40 : 40;

    return (
      <G key={`slice-${index}`}>
        <Path
          id={`curve${index}`}
          d={`
            M ${x1Outer},${y1Outer}
            A ${outerRadius},${outerRadius} 0 ${
            angle > 180 ? 1 : 0
          },1 ${x2Outer},${y2Outer}
            L ${x2Inner},${y2Inner}
            A ${innerRadius},${innerRadius} 0 ${
            angle > 180 ? 1 : 0
          },0 ${x1Inner},${y1Inner}
            Z
          `}
          fill={color}
        />

        {/* <SvgText x={textX} y={textY} textAnchor="middle" fontSize="14">
            {`${value === 0 ? '' : TEN}`}
          </SvgText> */}

        {/* <SvgText
          x={textX}
          y={textY}
          fill="black"
          fontSize="16"
          textAnchor="middle">
          <TSpan
            stroke={color}
            fill="red"
            fontSize="16"
            textAnchor="middle">{`${value === 0 ? '' : TEN}`}</TSpan>
        </SvgText>

        <SvgText x={0} y={0} fill="black" fontSize="20" textAnchor="middle">
          {totalGiaTri.toFixed(3)}
        </SvgText> */}
      </G>
    );
  };

  const dataSort = donutLength === 2 ? data.slice().reverse() : data;

  return (
    <View style={styles.container}>
      {donutLength > 2 && (
        <View style={[styles.totalView]}>
          <Text style={styles.totalText}>
            {donVi === 'KWh'
              ? totalGiaTri.toFixed(1)
              : totalGiaTri.toFixed(3).replace('.', ',')}
          </Text>
        </View>
      )}
      <View style={styles.donViView}>
        <Text style={styles.donViText}>{donVi}</Text>
      </View>
      {/* <Text style={styles.totalText}>{totalGiaTri.toFixed(3)}</Text> */}

      <View style={styles.valueView}>
        {dataSort.map(item => {
          return (
            <View
              key={item.id}
              style={[
                // eslint-disable-next-line react-native/no-inline-styles
                // item.phaN_TRAM > 50 ? {top: 40} : {bottom: 40},
                styles.valueBackground,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor: item.color,
                  marginVertical: donutLength > 2 ? 5 : 10,
                },
              ]}>
              <Text style={[Theme.font]}>{item.teN_BD}</Text>
            </View>
          );
        })}
      </View>

      <Svg
        height={SIZE}
        width={SIZE}
        viewBox="-100 -100 200 200"
        style={styles.shadow}>
        {/* {data.map((value, index) => renderSlice(value, colors[index], index))} */}
        {data.reduce((acc, item) => acc + item.phaN_TRAM, 0) > 0 ? (
          data.map((value, index) =>
            renderSlice(value.phaN_TRAM, value.color, index, value.teN_BD),
          )
        ) : (
          <Circle
            cx="0"
            cy="0"
            r={SIZE / 2}
            stroke={Colors.gray}
            strokeWidth="20"
            fill="transparent"
          />
        )}
      </Svg>
    </View>
  );
};

export default DonutChart;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    flex: 1,
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 3.85,
    elevation: 5,
  },
  valueBackground: {
    alignItems: 'center',
  },
  totalView: {
    position: 'absolute',
    top: -25,
  },
  totalText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueView: {
    position: 'absolute',
  },
  donViView: {position: 'absolute', top: -25, left: -15},
  donViText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function BigStarFilled(props) {
  return (
    <Svg
      width={48}
      height={49}
      viewBox="0 0 48 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M35.838 29.14a2.201 2.201 0 00-.638 1.94l1.778 9.84a2.16 2.16 0 01-.9 2.16c-.684.5-1.594.56-2.34.16l-8.858-4.62a2.262 2.262 0 00-1-.262h-.542a1.624 1.624 0 00-.54.18l-8.86 4.642c-.438.22-.934.298-1.42.22a2.223 2.223 0 01-1.78-2.542l1.78-9.84a2.238 2.238 0 00-.638-1.958l-7.222-7a2.16 2.16 0 01-.538-2.26 2.246 2.246 0 011.778-1.5l9.94-1.442a2.224 2.224 0 001.76-1.218l4.38-8.98c.104-.2.238-.384.4-.54l.18-.14c.094-.104.202-.19.322-.26l.218-.08.34-.14h.842a2.237 2.237 0 011.76 1.2l4.438 8.94c.32.654.942 1.108 1.66 1.218l9.94 1.442c.84.12 1.542.7 1.82 1.5a2.173 2.173 0 01-.58 2.26l-7.48 7.08z"
        fill="url(#paint0_linear_1450_27880)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1450_27880"
          x1={44.0052}
          y1={43.5025}
          x2={-3.2014}
          y2={29.0941}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FB9400" />
          <Stop offset={1} stopColor="#FFAB38" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default BigStarFilled;

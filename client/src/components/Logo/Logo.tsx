// material-ui
import useTailwind from '@/hooks/useTailwind';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //
interface Props {}
const Logo: React.FC<Props> = () => {
  const {
    theme: { colors },
  } = useTailwind();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="SOLANA" width="100" />
     *
     */
    <>
      <svg
        width="150"
        height="30"
        viewBox="0 0 349 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M102.027 16.8H76.5863V8.40001H108.613V1.90735e-05H76.5283C74.2993 1.90735e-05 72.1623 0.878918 70.5873 2.44322C69.0113 4.00762 68.1261 6.12932 68.1261 8.34171V16.8583C68.1261 19.0707 69.0113 21.1924 70.5873 22.7568C72.1623 24.3211 74.2993 25.2 76.5283 25.2H101.968V33.6H68.7313V42H102.027C104.255 42 106.392 41.1211 107.968 39.5568C109.544 37.9924 110.429 35.8707 110.429 33.6583V25.1417C110.429 22.9293 109.544 20.8076 107.968 19.2432C106.392 17.6789 104.255 16.8 102.027 16.8Z"
          fill={(colors as any).foreground}
        />
        <path
          d="M151.293 1.90735e-05H125.758C124.655 1.90735e-05 123.562 0.215818 122.543 0.635118C121.524 1.05442 120.598 1.66892 119.819 2.44362C119.039 3.21822 118.421 4.13792 117.999 5.14992C117.578 6.16192 117.361 7.24652 117.362 8.34171V33.6583C117.361 34.7535 117.578 35.8381 117.999 36.8501C118.421 37.8621 119.039 38.7818 119.819 39.5564C120.598 40.3311 121.524 40.9456 122.543 41.3649C123.562 41.7842 124.655 42 125.758 42H151.293C153.522 42 155.659 41.1211 157.234 39.5568C158.81 37.9924 159.695 35.8707 159.695 33.6583V8.34171C159.695 6.12932 158.81 4.00762 157.234 2.44322C155.659 0.878918 153.522 1.90735e-05 151.293 1.90735e-05ZM151.234 33.6H125.852V8.40001H151.234V33.6Z"
          fill={(colors as any).foreground}
        />
        <path
          d="M240.659 1.93874e-05H215.759C213.53 1.93874e-05 211.393 0.878918 209.818 2.44322C208.242 4.00762 207.357 6.12932 207.357 8.34171V42H215.817V28.1983H240.6V42H249.061V8.34171C249.061 7.24601 248.845 6.16092 248.423 5.14852C248.001 4.13612 247.382 3.21632 246.601 2.44152C245.821 1.66682 244.895 1.05232 243.875 0.633419C242.855 0.214519 241.762 -0.000780612 240.659 1.93874e-05ZM240.6 19.7983H215.817V8.40001H240.6V19.7983Z"
          fill={(colors as any).foreground}
        />
        <path
          d="M339.718 1.8336e-05H314.824C313.719 -0.00228166 312.625 0.211817 311.603 0.630017C310.582 1.04812 309.654 1.66222 308.872 2.43702C308.09 3.21192 307.469 4.13222 307.046 5.14541C306.623 6.15861 306.405 7.24481 306.405 8.34171V42H314.865V28.1984H339.66V42H348.12V8.34171C348.12 6.12931 347.235 4.00762 345.659 2.44322C344.084 0.878917 341.947 1.8336e-05 339.718 1.8336e-05ZM339.66 19.7984H314.883V8.40001H339.66V19.7984Z"
          fill={(colors as any).foreground}
        />
        <path
          d="M290.429 33.6H287.045L274.918 3.50002C274.503 2.46722 273.786 1.58172 272.859 0.957819C271.932 0.333919 270.838 0.000219073 269.718 1.90735e-05H262.186C260.701 1.90735e-05 259.277 0.585719 258.227 1.62822C257.177 2.67082 256.587 4.08482 256.587 5.55922V42H265.047V8.40001H268.432L280.553 38.5C280.966 39.5327 281.682 40.4185 282.608 41.0426C283.534 41.6666 284.627 42.0002 285.746 42H293.279C294.764 42 296.188 41.4143 297.238 40.3718C298.288 39.3292 298.878 37.9152 298.878 36.4408V1.90735e-05H290.417L290.429 33.6Z"
          fill={(colors as any).foreground}
        />
        <path
          d="M175.653 1.90735e-05H167.192V33.6583C167.192 35.8707 168.077 37.9924 169.653 39.5568C171.229 41.1211 173.366 42 175.594 42H201.035V33.6H175.653V1.90735e-05Z"
          fill={(colors as any).foreground}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.07318 32.025C8.22338 31.8635 8.40488 31.7337 8.60678 31.6435C8.80878 31.5533 9.02688 31.5045 9.24828 31.5H46.1696C46.3258 31.5022 46.478 31.5491 46.608 31.6352C46.738 31.7213 46.8402 31.8428 46.9022 31.9851C46.9643 32.1275 46.9836 32.2846 46.9579 32.4376C46.9321 32.5906 46.8624 32.7329 46.7571 32.8475L38.931 41.475C38.7808 41.6365 38.5993 41.7663 38.3974 41.8565C38.1954 41.9467 37.9773 41.9955 37.756 42H0.811162C0.654962 41.9978 0.502661 41.9509 0.372761 41.8648C0.242761 41.7787 0.14056 41.6572 0.07846 41.5149C0.0164599 41.3725 -0.00283936 41.2154 0.0228607 41.0624C0.0485608 40.9094 0.118361 40.7671 0.223661 40.6525L8.07318 32.025ZM46.7923 24.8733C46.8977 24.9879 46.9674 25.1303 46.9931 25.2833C47.0189 25.4363 46.9995 25.5934 46.9375 25.7357C46.8754 25.8781 46.7732 25.9996 46.6433 26.0856C46.5133 26.1717 46.361 26.2186 46.2048 26.2208L9.27178 26.25C9.05038 26.2455 8.83228 26.1967 8.63028 26.1065C8.42838 26.0163 8.24688 25.8865 8.09668 25.725L0.21186 17.1267C0.10656 17.0121 0.03686 16.8697 0.0110599 16.7167C-0.0146402 16.5637 0.00466019 16.4066 0.0667603 16.2643C0.12886 16.1219 0.230962 16.0004 0.360962 15.9144C0.490962 15.8283 0.643163 15.7814 0.799363 15.7792L37.7324 15.75C37.9537 15.7545 38.172 15.8033 38.3739 15.8935C38.5758 15.9837 38.7573 16.1135 38.9075 16.275L46.7923 24.8733ZM8.07318 0.525018C8.22338 0.363519 8.40488 0.233718 8.60678 0.143518C8.80878 0.0533184 9.02688 0.00451907 9.24828 1.90735e-05L46.1931 0.0292187C46.3493 0.0314187 46.5015 0.0783191 46.6315 0.164419C46.7615 0.250419 46.8636 0.371918 46.9257 0.514318C46.9878 0.656618 47.0071 0.813718 46.9814 0.966718C46.9556 1.11972 46.8859 1.26212 46.7806 1.37672L38.931 9.97501C38.7808 10.1365 38.5993 10.2663 38.3974 10.3565C38.1954 10.4467 37.9773 10.4955 37.756 10.5H0.811162C0.654962 10.4978 0.502661 10.4509 0.372761 10.3648C0.242761 10.2787 0.14056 10.1572 0.07846 10.0149C0.0164599 9.87251 -0.00283936 9.71542 0.0228607 9.56242C0.0485608 9.40942 0.118361 9.26711 0.223661 9.15251L8.07318 0.525018Z"
          fill={(colors as any).foreground}
        />
      </svg>
    </>
  );
};

export default Logo;

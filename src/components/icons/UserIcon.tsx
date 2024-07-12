const UserIcon = ({ color = "#dfe7ec" }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 10C20 13.0134 18.6672 15.7154 16.5588 17.5488C14.8031 19.0756 12.5095 20 10 20C7.49052 20 5.19694 19.0756 3.44117 17.5488C1.33285 15.7154 0 13.0134 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10C11.6569 10 13 8.65685 13 7ZM10 12C11.7127 12 12.839 12.9166 13.6332 13.9355C14.2257 14.6957 14.0218 15.8107 13.1622 16.2467C12.2124 16.7285 11.1379 17 10 17C8.8621 17 7.78761 16.7285 6.83779 16.2467C5.97822 15.8107 5.77427 14.6956 6.3668 13.9355C7.16096 12.9166 8.28726 12 10 12Z"
        fill={color}
      />
    </svg>
  );
};

export default UserIcon;

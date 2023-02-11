export const PlusIcon = ({
    fill = "currentColor",
    filled,
    size,
    height,
    width,
    label,
    ...props
  }) => {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"
          fill={fill}
        />
      </svg>
    );
  };

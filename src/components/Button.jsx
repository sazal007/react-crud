const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ? ${className} : btn btn-info`}
    >
      {children}
    </button>
  )
}

export default Button
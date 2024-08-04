const Input = ({ label, name, type, value, onChange, accept, error }) => {
  const isRequired = name === 'name' || name === 'phone';
  return (
    <div className="mb-4">
      <label className="input input-bordered input-primary flex items-center gap-3">
        {label}{isRequired && <span className="text-red-500">*</span>}
        <input
          type={type}
          value={type === 'file' ? undefined : value}
          name={name}
          onChange={onChange}
          accept={accept}
          className="grow w-[12rem]"
          placeholder={label} />
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default Input
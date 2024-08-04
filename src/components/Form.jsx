import { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';
import Input from './Input';
import Button from './Button';

const schema = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
  phone: Joi.string().pattern(/^[0-9]{7,}$/).required().label("Phone Number"),
  dob: Joi.date().required().label("Date of Birth"),
  city: Joi.string().required().label("City"),
  district: Joi.string().required().label("District"),
  province: Joi.string().required().label("Province"),
  country: Joi.string().required().label("Country"),
  profilePicture: Joi.any().required().label("Profile Picture")
});

// eslint-disable-next-line react/prop-types
const Form = ({ onSave, editingProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    city: '',
    district: '',
    province: '',
    country: 'Nepal',
    profilePicture: null,
  });

  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data.map(country => country.name.common));
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (editingProfile) {
      setFormData(editingProfile);
    }
  }, [editingProfile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const formValidate = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const newErrors = {};
    error.details.forEach((item) => {
      newErrors[item.path[0]] = item.message;
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = formValidate();
    setErrors(validationErrors || {});

    if (!validationErrors) {
      onSave(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        dob: '',
        city: '',
        district: '',
        province: '',
        country: 'Nepal',
        profilePicture: null,
      });
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='input-flex'>
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Phone Number"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>
        <div className='input-flex'>
          <Input
            label="Date of Birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
          />
          <Input
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />
          <Input
            label="District"
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            error={errors.district}
          />
        </div>
        <div className='input-flex'>
          <div className="mb-4">
            <label className="block text-gray-700">Province</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="select select-primary w-[15rem]"
            >
              <option disabled value="" selected>Select Province</option>
              <option value="Province 1">Province 1</option>
              <option value="Province 2">Province 2</option>
              <option value="Province 3">Province 3</option>
              <option value="Province 4">Province 4</option>
              <option value="Province 5">Province 5</option>
              <option value="Province 6">Province 6</option>
              <option value="Province 7">Province 7</option>
            </select>
            {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-[15rem] px-3 py-2 select select-primary"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              accept=".png"
              onChange={handleChange}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
            {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}
          </div>
        </div>
        <Button type="submit">{editingProfile ? 'Update Profile' : 'Add Profile'}</Button>
      </form>
    </>
  )
}

export default Form
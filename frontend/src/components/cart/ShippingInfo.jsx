import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { addShippingInfo } from '../../actions/cartAction.js';
import MetaData from '../layout/MetaData.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PinDrop, Home, LocationCity, Public, Phone, TransferWithinAStation } from '@mui/icons-material';
import { Country, State } from 'country-state-city';
import { toast } from 'react-toastify'
import CheckOutSteps from '../cart/CheckOutSteps.jsx'
function ShippingInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      address: shippingInfo.address || '',
      city: shippingInfo.city || '',
      state: shippingInfo.state || '',
      country: shippingInfo.country || '',
      pinCode: shippingInfo.pinCode || '',
      phone: shippingInfo.phone || '',
    },
  });

  const country = watch('country');

  const onSubmit = (data) => {
    if (data.phone.length !== 10) {
      toast.error('Phone number must be 10 digits long');
      return;
    }

    dispatch(addShippingInfo(data));
    navigate('/order/confirm');
  };

  return (
    <>
      <MetaData title="Shipping Information" />
      <CheckOutSteps activeStep={0} />
      <div className="max-w-2xl mx-auto my-[5vmax] bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Address */}
          <div className="flex items-center space-x-2">
            <Home className="text-gray-500" />
            <input
              type="text"
              placeholder="Address"
              {...register('address', { required: 'Address is required' })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

          {/* City */}
          <div className="flex items-center space-x-2">
            <LocationCity className="text-gray-500" />
            <input
              type="text"
              placeholder="City"
              {...register('city', { required: 'City is required' })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

          {/* Pin Code */}
          <div className="flex items-center space-x-2">
            <PinDrop className="text-gray-500" />
            <input
              type="number"
              placeholder="Pin Code"
              {...register('pinCode', { required: 'Pin Code is required' })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode.message}</p>}

          {/* Phone Number */}
          <div className="flex items-center space-x-2">
            <Phone className="text-gray-500" />
            <input
              type="tel"
              placeholder="Phone Number"
              {...register('phone', { required: 'Phone number is required', minLength: { value: 10, message: 'Phone must be 10 digits' } })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

          {/* Country */}
          <div className="flex items-center space-x-2">
            <Public className="text-gray-500" />
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Country is required' }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}

          {/* State */}
          <div className="flex items-center space-x-2">
            <TransferWithinAStation className="text-gray-500" />
            <Controller
              name="state"
              control={control}
              rules={{ required: 'State is required' }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border rounded px-3 py-2"
                  disabled={!country}
                >
                  <option value="">Select State</option>
                  {country &&
                    State.getStatesOfCountry(country).map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                </select>
              )}
            />
          </div>
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded ${Object.keys(errors).length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            disabled={Object.keys(errors).length > 0}
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default ShippingInfo;

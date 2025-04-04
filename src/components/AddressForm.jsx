import { useState } from "react";
import { Button } from "./ui/Button";
import { ListCreateRetrieveUpdateRemoveAddress } from "../Api";
import PropTypes from "prop-types";

export const AddressForm = ({ address = null, onCancel = () => { }, onSubmit = (data) => { } }) => {
    const [name, setName] = useState(address ? address.name : '');
    const [phone, setPhone] = useState(address ? address.phone : '');
    const [building, setBuilding] = useState(address ? address.building : '');
    const [street, setStreet] = useState(address ? address.street : '');
    const [locality, setLocality] = useState(address ? address.locality : '');
    const [landmark, setLandmark] = useState(address ? address.landmark : '');
    const [city, setCity] = useState(address ? address.city : '');
    const [state, setState] = useState(address ? address.state : '');
    const [pin, setPin] = useState(address ? address.pin : '');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        var data;
        if (address != null)
            data = await ListCreateRetrieveUpdateRemoveAddress({
                id: address.id,
                data: {
                    name: name,
                    phone: phone,
                    building: building,
                    street: street,
                    locality: locality,
                    landmark: landmark,
                    city: city,
                    state: state,
                    pin: pin
                }
            });
        else
            data = await ListCreateRetrieveUpdateRemoveAddress({
                data: {
                    name: name,
                    phone: phone,
                    building: building,
                    street: street,
                    locality: locality,
                    landmark: landmark,
                    city: city,
                    state: state,
                    pin: pin
                }
            });
        onSubmit(data);
        setSubmitting(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        name="name"
                        placeholder="Name of the person receiving the order"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        name="building"
                        placeholder="Building Name or Number"
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        name="street"
                        placeholder="Street Name or Number"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        name="locality"
                        placeholder="Locality or Area"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        name="landmark"
                        placeholder="Landmark (optional)"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        name="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        name="state"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        name="pin"
                        placeholder="Pincode"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300"
                    onClick={onCancel}
                    disabled={submitting}
                >
                    Cancel
                </Button>
                <Button type="submit" className="bg-[#8B5A2B] hover:bg-[#A0522D]" disabled={submitting}>
                    {submitting ? 'Saving...' : address ? 'Update Address' : 'Save Address'}
                </Button>
            </div>
        </form>
    );
}

AddressForm.propTypes = {
    address: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        phone: PropTypes.string,
        building: PropTypes.string,
        street: PropTypes.string,
        locality: PropTypes.string,
        landmark: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        pin: PropTypes.string,
    }),
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
};

AddressForm.defaultProps = {
    address: null,
    onCancel: () => { },
    onSubmit: (data) => { },
};
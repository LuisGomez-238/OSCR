import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { format } from 'date-fns';
import './App.css';

const App = () => {
    const [formData, setFormData] = useState({
        buyerName: '',
        buyerEmail: '',
        buyerAddress: '',
        buyerYearsDriving: '',
        buyerYearsOwner: '',
        buyerFleetSize: '',
        buyerTrucksInFleet: '',
        buyerTrailersInFleet: '',
        date: '',
        salesPerson: '',
        dealNumber: '',
        stockNumber: '',
        sellerName: '',
        sellerCompanyName: '',
        sellerAddress: '',
        sellerCity: '',
        sellerState: '',
        sellerZip: '',
        sellerPhone: '',
        sellerEmail: '',
        buyerCompanyName: '',
        buyerCity: '',
        buyerState: '',
        buyerZip: '',
        buyerPhone: '',
        assetYear: '',
        assetMake: '',
        assetModel: '',
        VIN: '',
        assetMiles: '',
        assetHours: '',
        assetEngine: '',
        assetEngineSerial: '',
        assetFuelTank: '',
        assetTransmission: '',
        assetSuspension: '',
        assetTireSize: '',
        assetWheelType: '',
        assetSleeper: '',
        assetDoubleBunk: '',
        assetInteriorColor: '',
        assetExteriorColor: '',
        assetExteriorOptions: '',
        salePrice: '',
        lienholderName: '',
        lienholderAddress: '',
        lienholderCityStateZip: '',
        lienholderPhoneNumber: '',
        payOff: '',
        payOffExpiration: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fillPdfWithFormFields(formData);
    };

    // Function to load the PDF
    const loadPdf = async (url) => {
        const response = await fetch(url);
        return await response.arrayBuffer();
    };

    // Function to fill in the PDF form fields
    const fillPdfWithFormFields = async (formData) => {
        const pdfBytes = await loadPdf('/pdfs/billOfSale.pdf'); // Load your PDF
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();

        // Helper function to set text for a field
        const setFieldText = (fieldName, value) => {
            try {
                const field = form.getTextField(fieldName);
                field.setText(value);
            } catch (error) {
                console.warn(`Field "${fieldName}" does not exist: ${error.message}`);
            }
        };

        // Format the date before setting it in the PDF
        const formattedDate = format(new Date(formData.date + 'T00:00:00'), 'MM/dd/yy');
        setFieldText('date', formattedDate);

        // Fill in the PDF form fields using the helper function
        setFieldText('buyerName', formData.buyerName);
        setFieldText('buyerEmail', formData.buyerEmail);
        setFieldText('buyerAddress', formData.buyerAddress);
        setFieldText('salesPerson', formData.salesPerson);
        setFieldText('dealNumber', formData.dealNumber);
        setFieldText('sellerName', formData.sellerName);
        setFieldText('sellerCompanyName', formData.sellerCompanyName);
        setFieldText('sellerAddress', formData.sellerAddress);
        setFieldText('sellerCity', formData.sellerCity);
        setFieldText('sellerState', formData.sellerState);
        setFieldText('sellerZip', formData.sellerZip);
        setFieldText('sellerPhone', formData.sellerPhone);
        setFieldText('sellerEmail', formData.sellerEmail);
        setFieldText('buyerCompanyName', formData.buyerCompanyName);
        setFieldText('buyerCity', formData.buyerCity);
        setFieldText('buyerState', formData.buyerState);
        setFieldText('buyerZip', formData.buyerZip);
        setFieldText('buyerPhone', formData.buyerPhone);
        setFieldText('buyerYearsDriving', formData.buyerYearsDriving);
        setFieldText('buyerYearsOwner', formData.buyerYearsOwner);
        setFieldText('buyerFleetSize', formData.buyerFleetSize);
        setFieldText('buyerTrucksInFleet', formData.buyerTrucksInFleet);
        setFieldText('buyerTrailersInFleet', formData.buyerTrailersInFleet);
        setFieldText('stockNumber', formData.stockNumber);
        setFieldText('assetYear', formData.assetYear);
        setFieldText('assetMake', formData.assetMake);
        setFieldText('assetModel', formData.assetModel);
        setFieldText('VIN', formData.VIN);
        setFieldText('assetMiles', formData.assetMiles);
        setFieldText('assetHours', formData.assetHours);
        setFieldText('assetEngine', formData.assetEngine);
        setFieldText('assetEngineSerial', formData.assetEngineSerial);
        setFieldText('assetFuelTank', formData.assetFuelTank);
        setFieldText('assetTransmission', formData.assetTransmission);
        setFieldText('assetSuspension', formData.assetSuspension);
        setFieldText('assetTireSize', formData.assetTireSize);
        setFieldText('assetWheelType', formData.assetWheelType);
        setFieldText('assetSleeper', formData.assetSleeper);
        setFieldText('assetDoubleBunk', formData.assetDoubleBunk);
        setFieldText('assetInteriorColor', formData.assetInteriorColor);
        setFieldText('assetExteriorColor', formData.assetExteriorColor);
        setFieldText('assetExteriorOptions', formData.assetExteriorOptions);
        setFieldText('salePrice', formData.salePrice);
        setFieldText('lienholderName', formData.lienholderName);
        setFieldText('lienholderAddress', formData.lienholderAddress);
        setFieldText('lienholderCityStateZip', formData.lienholderCityStateZip);
        setFieldText('lienholderPhoneNumber', formData.lienholderPhoneNumber);
        setFieldText('payOff', formData.payOff);
        setFieldText('payOffExpiration', formData.payOffExpiration);
        // Include any additional fields as needed

        // Serialize the PDF and trigger a download
        const pdfBytesFilled = await pdfDoc.save();
        const blob = new Blob([pdfBytesFilled], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `filled-form.pdf`;
        link.click();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='header'>
                <input 
                    type="date" 
                    name="date" 
                    onChange={handleChange} 
                /> 
                <input type="text" name="salesPerson" placeholder="Sales Person" onChange={handleChange} />
                <input type="text" name="dealNumber" placeholder="Deal Number" onChange={handleChange} />
                <input type="text" name="stockNumber" placeholder="Stock Number" onChange={handleChange} />
            </div>

            <div className='buyerInfo'>
                <h2>Buyer</h2>
                <input type="text" name="buyerName" placeholder="Full Name" onChange={handleChange} />
                <input type="text" name="buyerCompanyName" placeholder="Company Name" onChange={handleChange} />
                <input type="email" name="buyerEmail" placeholder="Email" onChange={handleChange} />
                <input type="tel" name="buyerPhone" placeholder="Phone Number" onChange={handleChange} />
                <input type="text" name="buyerAddress" placeholder="Street Address" onChange={handleChange} />
                <input type="text" name="buyerCity" placeholder="City" onChange={handleChange} />
                <input type="text" name="buyerState" placeholder="State" onChange={handleChange} />
                <input type="number" name="buyerZip" placeholder="Zip" onChange={handleChange} />
                <input type="text" name="buyerCDLNumber" placeholder="CDL Number" onChange={handleChange} />
                <input type="text" name="buyerCDLState" placeholder="CDL State" onChange={handleChange} />
                <input type="text" pattern="\d{3}-\d{2}-\d{4}" name="buyerSS" placeholder="SSN" onChange={handleChange} />
                <input type="text" name="buyerEIN" placeholder="EIN" onChange={handleChange} />
                <input type="number" name="buyerYearsDriving" placeholder="Commercial Driving Experience" onChange={handleChange} />
                <input type="number" name="buyerYearsOwner" placeholder="Owner Operator Experience" onChange={handleChange} />
                <input type="number" name="buyerFleetSize" placeholder="Fleet Size" onChange={handleChange} />
                <input type="number" name="buyerTrucksInFleet" placeholder="Trucks in Fleet" onChange={handleChange} />
                <input type="number" name="buyerTrailersInFleet" placeholder="Trailers in Fleet" onChange={handleChange} />
            </div>

            <div className='sellerInfo'>
                <h2>Seller</h2>
                <input type="text" name="sellerName" placeholder="Full Name" onChange={handleChange} />
                <input type="text" name="sellerCompanyName" placeholder="Company Name" onChange={handleChange} />
                <input type="email" name="sellerEmail" placeholder="Email" onChange={handleChange} />
                <input type="tel" name="sellerPhone" placeholder="Phone Number" onChange={handleChange} />
                <input type="text" name="sellerAddress" placeholder="Street Address" onChange={handleChange} />
                <input type="text" name="sellerCity" placeholder="City" onChange={handleChange} />
                <input type="text" name="sellerState" placeholder="State" onChange={handleChange} />
                <input type="number" name="sellerZip" placeholder="Zip" onChange={handleChange} />
            </div>

            <div className='assetInfo'>
                <h2>Asset Info</h2>
                <input type="text" name="assetYear" placeholder="Year" onChange={handleChange} />
                <input type="text" name="assetMake" placeholder="Make" onChange={handleChange} />
                <input type="text" name="assetModel" placeholder="Model" onChange={handleChange} />
                <input type="text" name="VIN" placeholder="VIN" onChange={handleChange} />
                <input type="number" name="assetMiles" placeholder="Miles" onChange={handleChange} />
                <input type="number" name="assetHours" placeholder="Hours" onChange={handleChange} />
                <input type="text" name="assetEngine" placeholder="Engine" onChange={handleChange} />
                <input type="text" name="assetEngineSerial" placeholder="Engine Serial" onChange={handleChange} />
                <input type="text" name="assetFuelTank" placeholder="Fuel Tank" onChange={handleChange} />
                <input type="text" name="assetTransmission" placeholder="Transmission" onChange={handleChange} />
                <input type="text" name="assetSuspension" placeholder="Suspension" onChange={handleChange} />
                <input type="text" name="assetTireSize" placeholder="Tire Size" onChange={handleChange} />
                <input type="text" name="assetWheelType" placeholder="Wheel Type" onChange={handleChange} />
                <input type="text" name="assetSleeper" placeholder="Sleeper" onChange={handleChange} />
                <input type="text" name="assetDoubleBunk" placeholder="Double Bunk" onChange={handleChange} />
                <input type="text" name="assetInteriorColor" placeholder="Interior Color" onChange={handleChange} />
                <input type="text" name="assetExteriorColor" placeholder="Exterior Color" onChange={handleChange} />
                <input type="text" name="assetExteriorOptions" placeholder="Exterior Options" onChange={handleChange} />
            </div>

            <div className='paymentInfo'>
                <h2>Payment Info</h2>
                <input type="number" name="salePrice" placeholder="Sale Price" onChange={handleChange} />
                <input type="text" name="lienholderName" placeholder="Lienholder Name" onChange={handleChange} />
                <input type="text" name="lienholderAddress" placeholder="Lienholder Address" onChange={handleChange} />
                <input type="text" name="lienholderCityStateZip" placeholder="City, State, Zip" onChange={handleChange} />
                <input type="tel" name="lienholderPhoneNumber" placeholder="Lienholder Phone Number" onChange={handleChange} />
                <input type="number" name="payOff" placeholder="Pay Off" onChange={handleChange} />
                <input type="text" name="payOffExpiration" placeholder="Pay Off Expiration" onChange={handleChange} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default App;

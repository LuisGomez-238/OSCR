import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

// Define the path to your PDF template for the seller form
const pdfTemplates = {
    SellerForm: '/pdfs/SellerForms.pdf',
    POASellerToSlate: '/pdfs/POASellerToSlate.pdf',
    ConsignmentForm: '/pdfs/ConsignmentForm.pdf',

};

const Seller = () => {
    const [formData, setFormData] = useState({
        sellerName: '',
        sellerCompanyName: '',
        sellerAddress: '',
        sellerCityStateZip: '',
        sellerPhone: '',
        sellerEmail: '',
        sellerCDLNumber: '',
        sellerCDLState: '',
        stockNumber: '',
        dateReceived: new Date(),
    });

    const [selectedTemplate, setSelectedTemplate] = useState('BuyerForms');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            dateReceived: date,
        }));
    };

    const handleTemplateChange = (e) => {
        setSelectedTemplate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fillPdfWithFormFields(formData, selectedTemplate);
    };

    const loadPdf = async (template) => {
        const response = await fetch(pdfTemplates[template]);
        return await response.arrayBuffer();
    };

    const fillPdfWithFormFields = async (formData, template) => {
        try {
            const pdfBytes = await loadPdf(template);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const form = pdfDoc.getForm();

            const setFieldText = (fieldName, value) => {
                try {
                    const field = form.getTextField(fieldName);
                    field.setText(value);
                } catch (error) {
                    console.warn(`Field "${fieldName}" does not exist: ${error.message}`);
                }
            };

            // Fill in the PDF form fields using the helper function
            setFieldText('sellerName', formData.sellerName);
            setFieldText('sellerCompanyName', formData.sellerCompanyName);
            setFieldText('sellerAddress', formData.sellerAddress);
            setFieldText('sellerCityStateZip', formData.sellerCityStateZip);
            setFieldText('sellerPhone', formData.sellerPhone);
            setFieldText('sellerEmail', formData.sellerEmail);
            setFieldText('sellerCDLNumber', formData.sellerCDLNumber);
            setFieldText('sellerCDLState', formData.sellerCDLState);
            setFieldText('stockNumber', formData.stockNumber);
            setFieldText('dateReceived', format(formData.dateReceived, 'MM/dd/yy')); // Format date

            // Serialize the PDF and trigger a download
            const pdfBytesFilled = await pdfDoc.save();
            const blob = new Blob([pdfBytesFilled], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `filled-seller-form.pdf`;
            link.click();
        } catch (error) {
            console.error('Error filling PDF:', error);
            alert('There was an error generating the PDF. Please try again.');
        }
    };

    return (
        <div className='SellerFormContainers'>
            <h2>Seller Details</h2>
            <div className='formSelection'>
                <label htmlFor="pdfTemplate"></label>
                <select name="pdfTemplate" value={selectedTemplate} onChange={handleTemplateChange}>
                    <option value="SellerForms">Seller Forms</option>
                    <option value="ConsignmentForm">Consignment Form</option>
                    <option value="POASellerToSlate">POA Seller to Slate</option>
                </select>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='header'>
                    <DatePicker
                        selected={formData.dateReceived}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yy"
                        placeholderText="Select a date"
                    />
                    <input type="text" name="stockNumber" placeholder="Stock Number" onChange={handleChange} />
                </div>
                <div className='sellerInfo'>
                    <input type="text" name="sellerName" placeholder="Seller Name" onChange={handleChange} />
                    <input type="text" name="sellerCompanyName" placeholder="Company Name" onChange={handleChange} />
                    <input type="text" name="sellerAddress" placeholder="Address" onChange={handleChange} />
                    <input type="text" name="sellerCityStateZip" placeholder="City, State, Zip" onChange={handleChange} />
                    <input type="tel" name="sellerPhone" placeholder="Phone" onChange={handleChange} />
                    <input type="email" name="sellerEmail" placeholder="Email" onChange={handleChange} />
                    <input type="text" name="sellerCDLNumber" placeholder="CDL Number" onChange={handleChange} />
                    <input type="text" name="sellerCDLState" placeholder="CDL State" onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Seller;

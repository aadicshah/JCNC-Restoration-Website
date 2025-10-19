
import React, { useState } from 'react';

const PledgeForm: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xgvnlbed", {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                setSubmitted(true);
            } else {
                alert("There was an error submitting your pledge. Please try again.");
            }
        } catch (error) {
            alert("A network error occurred. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center bg-green-50 border border-green-200 text-green-800 p-5 rounded-xl font-semibold">
                    <h2 className="text-2xl font-serif text-green-900">Thank you for your pledge!</h2>
                    <p className="mt-2">Our fundraising team will reach out shortly.</p>
                    <p>To Zelle, make a payment to <strong>finance@jcnc.org</strong>, with your name and Labh in the summary.</p>
                    <p>If you have any questions, email <a href="mailto:fundraising@jcnc.org" className="font-bold underline">fundraising@jcnc.org</a>.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Make a Pledge</h2>
            <p className="text-muted mb-5">
                Your contribution helps preserve JCNC’s spiritual and cultural legacy for future generations.
            </p>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <FormGroup label="Full Name" id="donorName" type="text" required />
                    <FormGroup label="Email" id="donorEmail" type="email" required />
                </div>
                 <div className="flex flex-col md:flex-row gap-5">
                    <FormGroup label="Phone Number" id="donorPhone" type="tel" placeholder="(XXX) XXX-XXXX" />
                    <FormGroup label="Pledge Amount (USD)" id="donationAmount" type="number" min="1" required />
                </div>
                 <FormGroup label="Select a Labh Tier" id="donationTier" type="select" required>
                    <option value="">-- Choose an Option --</option>
                    <option value="Dining Hall Primary Sponsor">$500,000 – Dining Hall Primary Sponsor</option>
                    <option value="Dining Hall Restoration Sponsor">$300,000 – Dining Hall Restoration Sponsor</option>
                    <option value="Kitchen Restoration Sponsor">$100,000 – Kitchen Restoration Sponsor</option>
                    <option value="Classroom A Restoration">$100,000 – Classroom A Restoration</option>
                    <option value="Classroom B Restoration">$100,000 – Classroom B Restoration</option>
                    <option value="Sponsor a Tile">$2,500 – Sponsor a Tile</option>
                    <option value="Flexible Pledge">Other – Flexible Pledge</option>
                </FormGroup>

                 <div>
                    <label className="block font-semibold mb-2 text-jcnc-blue">Payment Method</label>
                    <div className="flex gap-5 flex-wrap">
                        <RadioOption name="paymentMethod" value="zelle" label="Zelle" required />
                        <RadioOption name="paymentMethod" value="check" label="Check" />
                        <RadioOption name="paymentMethod" value="pledge" label="Pledge / Installments" />
                    </div>
                </div>

                <FormGroup label="Message or Dedication (optional)" id="donorMessage" type="textarea" placeholder="Write a message or dedication..." />
                
                <div className="text-center mt-2">
                     <button type="submit" className="bg-gradient-to-r from-jcnc-gold to-jcnc-gold-2 text-[#3b2d09] border-none py-3 px-5 rounded-full font-bold cursor-pointer shadow-lg transition-transform duration-150 ease-in-out hover:-translate-y-0.5 hover:brightness-105">Submit Pledge</button>
                </div>
                 <input type="hidden" name="_subject" value="New JCNC Jirnodhar Pledge" />
            </form>
        </div>
    );
};


// Helper Components for Form Fields
interface FormGroupProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
    label: string;
    id: string;
    type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea';
    children?: React.ReactNode;
}
const FormGroup: React.FC<FormGroupProps> = ({ label, id, type, children, ...props }) => {
    const commonClasses = "w-full border border-gray-300 rounded-lg p-3 text-base bg-gray-50 outline-none transition-all duration-200 focus:border-jcnc-gold focus:shadow-[0_0_0_3px_rgba(200,153,50,0.25)]";
    const InputComponent = type === 'select' ? 'select' : type === 'textarea' ? 'textarea' : 'input';
    
    return (
        <div className="flex-1 flex flex-col">
            <label htmlFor={id} className="font-semibold mb-2 text-jcnc-blue">{label}</label>
            <InputComponent id={id} name={id} type={type} className={commonClasses} {...props}>
                {children}
            </InputComponent>
        </div>
    );
};

const RadioOption: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {label: string}> = ({ name, value, label, ...props }) => (
    <label className="flex items-center gap-2 font-medium text-muted">
        <input type="radio" name={name} value={value} className="h-4 w-4 text-jcnc-gold focus:ring-jcnc-gold border-gray-300" {...props} />
        {label}
    </label>
);

export default PledgeForm;

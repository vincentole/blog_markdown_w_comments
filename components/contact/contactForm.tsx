import { FormEvent, useEffect, useState } from 'react';
import MessageFormType from './MessageFormType';

type RequestStatusType = null | 'error' | 'success' | 'pending';

async function sendContactData(message: MessageFormType) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
    }
}

const ContactForm = () => {
    const [emailInput, setEmailInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [requestStatus, setRequestStatus] = useState<RequestStatusType>(null);
    const [requestError, setRequestError] = useState<any>(null);

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000)

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    const sendMessageHandler = async (e: FormEvent) => {
        e.preventDefault();

        const message: MessageFormType = {
            email: emailInput,
            name: nameInput,
            message: messageInput,
        };

        // Client side validation
        // ...

        setRequestStatus('pending');
        try {
            await sendContactData(message);
            setRequestStatus('success');
            setEmailInput('');
            setNameInput('');
            setMessageInput('');
        } catch (e: any) {
            setRequestError(e.message);
            setRequestStatus('error');
        }

        
    };

    let notification: JSX.Element;
    if (requestStatus === 'pending') {
        notification = <div className='text-blue-500'>Sending Message...</div>;
    } else if (requestStatus === 'error') {
        notification = <div className='text-red-500'>{requestError}</div>;
    } else if (requestStatus === 'success') {
        notification = <div className='text-green-500'>Message sent successfully.</div>;
    } else notification = <div></div>;

    return (
        <section>
            <div className='spacer pt-12' />
            <div className='c-container'>
                <h2>How can I help you?</h2>
                <div className='spacer pt-8' />
                <form className='space-y-6' onSubmit={sendMessageHandler}>
                    <div className='flex gap-4'>
                        <div className='flex flex-col basis-1/2'>
                            <label htmlFor='email'>Your Email</label>
                            <div className='spacer pt-1' />
                            <input
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                type='email'
                                id='email'
                                required
                            />
                        </div>
                        <div className='flex flex-col basis-1/2'>
                            <label htmlFor='name'>Your Name</label>
                            <div className='spacer pt-1' />
                            <input
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                type='text'
                                id='name'
                                required
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='message'>Your Message</label>
                        <div className='spacer pt-1' />
                        <textarea
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            name='message'
                            id='message'
                            rows={5}
                            required
                        ></textarea>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className=''>{notification}</div>

                        <button
                            className='w-36 border border-zinc-900 bg-zinc-900 text-white px-4 py-2'
                            type='submit'
                            disabled={requestStatus === 'pending' ? true : false}
                        >
                            {requestStatus === 'pending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
            <div className='spacer pt-12' />
        </section>
    );
};

export default ContactForm;

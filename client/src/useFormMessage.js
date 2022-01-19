import { useState } from 'react';

const useFormMessage = () => {
  const [formMessage, setFormMessage] = useState('');
  const [formMessageStyle, setFormMessageStyle] = useState('success');

  const setFormMessageAndStyle = (message, style) => {
    setFormMessage(message);
    setFormMessageStyle(style);
  };

  return [formMessage, formMessageStyle, setFormMessageAndStyle];
};

export default useFormMessage;

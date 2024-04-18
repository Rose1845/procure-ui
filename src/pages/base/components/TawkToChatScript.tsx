import React, { useEffect } from 'react';

const TawkToChatScript: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://embed.tawk.to/661af7af1ec1082f04e20b45/1hrclf2j0';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return null;
};

export default TawkToChatScript;

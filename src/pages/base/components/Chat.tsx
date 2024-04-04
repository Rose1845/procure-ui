/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
import React, { useEffect } from 'react';

const KommunicateChatWidget: React.FC = () => {
    useEffect(() => {
        const kommunicateSettings = {
            appId: '237e20e39226d97e50f5b081973a3ce0f',
            popupWidget: true,
            automaticChatOpenOnNavigation: true,
        };

        const loadKommunicate = () => {
            (window as any).kommunicate = {
                ...kommunicateSettings,
                _globals: kommunicateSettings,
            };

            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
            const h = document.getElementsByTagName('head')[0];
            h.appendChild(s);
        };

        if (!(window as any).kommunicate) {
            loadKommunicate();
        }

        return () => {
            const h = document.getElementsByTagName('head')[0];
            const script = h.querySelector('script[src="https://widget.kommunicate.io/v2/kommunicate.app"]');
            if (script) {
                h.removeChild(script);
            }
        };
    }, []);

    return null;
};

export default KommunicateChatWidget;

'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const OfferDrawerContext = createContext();

export function OfferDrawerProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const [offer, setOffer] = useState(null);
	const [type, setType] = useState(null);

	const openDrawer = useCallback((offerData, offerType) => {
		// console.log('openDrawer', offerData, offerType);
		setOffer(offerData);
		setType(offerType);
		setIsOpen(true);
	}, []);

	const closeDrawer = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<OfferDrawerContext.Provider value={{ isOpen, offer, type, openDrawer, closeDrawer }}>
			{children}
		</OfferDrawerContext.Provider>
	);
}

export function useOfferDrawer() {
	return useContext(OfferDrawerContext);
}

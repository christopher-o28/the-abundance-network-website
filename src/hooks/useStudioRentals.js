// src/hooks/useStudioRentals.js
import { useState, useEffect } from 'react';
import { fetchSheet } from '../lib/sheets';

/**
 * Hook to fetch studio rental spaces and image rows from Google Sheet.
 * Checks tab 'StudioRentals' or 'Studios'.
 * Gracefully falls back if no Google Sheet is connected yet.
 */
export function useStudioRentals() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStudios() {
      try {
        let rawData = [];
        try {
          rawData = await fetchSheet('StudioRentals');
        } catch (e1) {
          try {
            rawData = await fetchSheet('Studios');
          } catch (e2) {
            // Sheet tab missing or VITE_SHEET_ID not set - fallback to empty array so default UI shows
            rawData = [];
          }
        }

        if (!rawData || rawData.length === 0) {
          try {
            const fallbackData = await fetchSheet('Studios');
            if (fallbackData && fallbackData.length > 0) {
              rawData = fallbackData;
            }
          } catch (e3) {}
        }

        const normalized = (rawData || []).map((row, idx) => ({
          id: row.id || `studio-${idx + 1}`,
          name: row.name || row.title || `Studio ${idx + 1}`,
          tagline: row.tagline || '',
          desc: row.desc || row.description || '',
          rate: row.rate || row.hourlyRate || '',
          capacity: row.capacity || '',
          audioSetup: row.audioSetup || row.audio || '',
          videoSetup: row.videoSetup || row.video || '',
          extendedHours: row.extendedHours || row.extendedHoursRate || '',
          additionalEquipment: row.additionalEquipment || row.equipment || row.equipmentForRent || row.additionalEquipmentForRent || row.rentalEquipment || row.addEquipment || '',
          image: row.image || row.imageUrl || row.coverImageUrl || row.photo || row.picture || '',
          category: row.category || row.type || '',
        }));

        if (isMounted) {
          setSpaces(normalized);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setSpaces([]);
          setError(null); // Keep error null so page renders default studio content gracefully
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStudios();

    return () => {
      isMounted = false;
    };
  }, []);

  return { spaces, loading, error };
}
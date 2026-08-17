"use client"
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/axios';
import React, { useState } from 'react';

export default function CreateORG() {
  const [orgName, setOrgName] = useState('');

  const router = useRouter()

  const handleCreateOrg = async () => {
    try {

      const res = await api.post("/api/org/create", {
        orgName
      })

      if( res.status === 200 ) {
        const { orgSlug } = res.data
        router.push(`/${orgSlug}/links`)
      }
      
    } catch (err) {
      
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        name="ofg name"
        placeholder="Enter organization name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        className='p-2 ring-1 m-3 rounded-sm'
      />
      <button 
        className='p-2 px-4 bg-green-600 text-white rounded-sm '
        onClick={handleCreateOrg}
        disabled={orgName.trim() === ''}
      >
        Create Org
      </button>
    </div>
  );
}
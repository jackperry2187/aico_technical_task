import { useEffect, useState, useCallback } from 'react'

interface HistoryEntry {
  type: 'registered' | 'updated';
  timestamp: string;
  before?: Partial<Device>;
  after?: Partial<Device>;
}

export interface Device {
  id: string;
  type: string;
  value: number;
  history: HistoryEntry[];
}

function App() {
  const [devices, setDevices] = useState<Device[]>([])

  const getList = useCallback(async () => {
    const list = await fetch('/list');
    const data = await list.json();
    setDevices(data);
  }, [setDevices]);

  useEffect(() => {
    getList();
  }, [getList]);

  const randomPatch = useCallback(async () => {
    const randomValue = Math.floor(Math.random() * 100);
    await fetch(`/device/${devices[0].id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: randomValue })
    });
    getList();
  }, [devices, getList]);

  const deleteLast = useCallback(async () => {
    if (devices.length === 0) return;
    const lastDeviceId = devices[devices.length - 1].id;
    await fetch(`/device/${lastDeviceId}`, {
      method: 'DELETE'
    });
    getList();
  }, [devices, getList]);

  const addNew = useCallback(async () => {
    const newDevice = {
      id: (devices.length + 1).toString(),
      type: 'light',
      value: 0
    };
    await fetch(`/register/device/${newDevice.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDevice)
    });
    getList();
  }, [devices, getList]);

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="text-center">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device: Device) => (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.type}</td>
                  <td>{device.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>Type</th>
                <th>Timestamp</th>
                <th>Before</th>
                <th>After</th>
              </tr>
            </thead>
            <tbody>
              {!!devices[0] && devices[0].history.map((historyItem: HistoryEntry) => (
                <tr>
                  <td>{historyItem.type}</td>
                  <td>{historyItem.timestamp}</td>
                  <td>{historyItem.before?.value}</td>
                  <td>{historyItem.after?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => getList()}
          >
          Refresh
        </button>
        <button 
            className="mt-4 ml-4 px-4 py-2 bg-yellow-600 text-white rounded"
            onClick={() => addNew()}
          >
          Add New
        </button>
        <button 
            className="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => randomPatch()}
          >
          Random Patch
        </button>
        <button 
            className="mt-4 ml-4 px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => deleteLast()}
          >
          Delete Last
        </button>
      </div>
    </div>
  )
}

export default App

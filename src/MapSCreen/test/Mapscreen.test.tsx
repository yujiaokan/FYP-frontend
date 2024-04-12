import  fetchMarkers from 'MapSCreen/ChargerMap';
import axios from 'axios';
import { API_URL } from './API'; 

// Mock the module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;



describe('fetch Charger Details', () => {
  it('fetches Charger Details from an API', async () => {
    const mockedMarkers = [{ id: 1, name: 'Charger1' }, { id: 2, name: 'Charher2' }];
    
    mockedAxios.get.mockResolvedValue({ data: mockedMarkers });

    const result = await fetchMarkers();

    expect(result).toEqual(mockedMarkers);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/v1/maps/details`);
  });

});
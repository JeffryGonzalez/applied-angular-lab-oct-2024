import { delay, http, HttpResponse } from 'msw';
import { HouseEntity, HouseEntry } from '../app/halloween/stores';

const fakeHouses: HouseEntity[] = [
  {
    id: '1',
    address: '1212 Mockingbird Court',
    hasAmbiance: true,
    hasFullSizeCandy: false,
    qualityRating: 3,
    quantityRating: 1,
  },
  {
    id: '2',
    address: '12 Byron Court',
    hasAmbiance: false,
    hasFullSizeCandy: true,
    qualityRating: 3,
    quantityRating: 4,
  },
  {
    id: '3',
    address: '999 Aspington Drive',
    hasAmbiance: true,
    hasFullSizeCandy: false,
    qualityRating: 3,
    quantityRating: 5,
  },
  {
    id: '4',
    address: '8 Elm',
    hasAmbiance: true,
    hasFullSizeCandy: true,
    qualityRating: 1,
    quantityRating: 2,
  },
  {
    id: '5',
    address: '50 Maple',
    hasAmbiance: false,
    hasFullSizeCandy: false,
    qualityRating: 1,
    quantityRating: 3,
  },
  {
    id: '6',
    address: '18 Reno',
    hasAmbiance: true,
    hasFullSizeCandy: true,
    qualityRating: 5,
    quantityRating: 5,
  },
];

const weirdData = [
  {
    id: '1',
    address: {
      street: '506 Reed',
      city: 'Akron',
      state: 'Oh',
    },
    ratings: {
      ambiance: 3,
      candy: 4,
    },
    qualityRating: 3,
    quantityRating: 4,
  },
];

const handlers = [
  http.get('/api/houses', async () => {
    //return HttpResponse.json([{ name: 'Brad' }, { name: 'Sarah' }]);
    //return HttpResponse.json(weirdData);
    return HttpResponse.json(fakeHouses);
  }),
  http.post('/api/houses', async ({ request }) => {
    const data = (await request.json()) as unknown as HouseEntry;
    await delay(data.address.length * 500);
    if (data.address === 'prospect') {
      return new HttpResponse('Address Not Found', { status: 400 });
    }
    const response = { id: 'R' + crypto.randomUUID(), ...data };
    fakeHouses.push(response);
    return HttpResponse.json(response);
  }),
];

export default handlers;

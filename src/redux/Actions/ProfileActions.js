export const DISTRIBUTOR_ONE_GET = 'DISTRIBUTOR_ONE_GET';
export const DISTRIBUTOR_ONE_GET_SUCCESS = 'DISTRIBUTOR_ONE_GET_SUCCESS';

export const getOneDistributor = (id =null) => ({
      type: 'DISTRIBUTOR_ONE_GET',
      payload:id
});

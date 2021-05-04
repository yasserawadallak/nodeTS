import {Router} from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (request, response) => {
  response.json({"message": "Working here"})
})

export default appointmentsRouter;

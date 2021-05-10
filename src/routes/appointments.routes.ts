import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import {Router} from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {

  console.log(request.user);

  const appointmentRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentRepository.find();
  response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {

    const {provider_id, date} = request.body

    const parsedDate = parseISO(date);

    const createAppoitment = new CreateAppointmentService();

    const appointment = await createAppoitment.excute(
      {date: parsedDate,
        provider_id})

    return response.json(appointment)

})

export default appointmentsRouter;

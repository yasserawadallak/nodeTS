import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import {Router} from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {

  const appointmentRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentRepository.find();
  response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try{
    const {provider_id, date} = request.body

    const parsedDate = parseISO(date);

    const createAppoitment = new CreateAppointmentService();

    const appointment = await createAppoitment.excute(
      {date: parsedDate,
        provider_id})

    return response.json(appointment)


  } catch (err){
    response.status(400).json({"error": err.message});
  }
})

export default appointmentsRouter;

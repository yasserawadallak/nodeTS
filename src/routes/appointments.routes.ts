import { parseISO } from 'date-fns';
import {Router} from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {

  const appointments = appointmentRepository.all();
  response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  try{
    const {provider, date} = request.body

    const parsedDate = parseISO(date);

    const createAppoitment = new CreateAppointmentService(
      appointmentRepository
    );

    const appointment = createAppoitment.excute({date: parsedDate, provider})

    return response.json(appointment)


  } catch (err){
    response.status(400).json({"error": err.message});
  }
})

export default appointmentsRouter;

import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core'; // on component initialization lifecycle hook

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements OnInit{
    
  // properties
  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = []


  // methods

  ngOnInit(): void {

    // check to see if we have any appointments stored in cache memory
    let savedAppointments = localStorage.getItem("appointments");

    if(savedAppointments){
      this.appointments = JSON.parse(savedAppointments); // deserialize into typescript object and save to appointments array.
    }else{
      this.appointments = []; 
    }

  }// end ngOnInit


  generateGuid(): string {
  
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }// end generateGuid

  addAppointment() {
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){

      let newAppointment: Appointment = {
        id: this.generateGuid(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }

      this.appointments.push(newAppointment);

      // after the appointment is added clear the form fields in the template
      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      // save appointments to local browser cache
      localStorage.setItem("appointments", JSON.stringify(this.appointments));

    }else{
      alert("Please provide valid appointment details.");
    }
  }// end addAppointment


  deleteAppointment(index:number) {
    this.appointments.splice(index,1);

    // save new list of modified appointments to local browser cache
      localStorage.setItem("appointments", JSON.stringify(this.appointments));

  }// end deletetAppointment

}
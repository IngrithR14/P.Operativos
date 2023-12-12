
const body=document.getElementById('t1');
const body2=document.getElementById('t2');
const nucleo1=document.getElementById('n1');
const nucleo2=document.getElementById('n2');
const memoria=document.getElementById('m1');
const boton=document.getElementById('b1');
class RoundRobin {
    constructor(quantum) {
      this.procesos = [];
      this.quantum = quantum;
      this.tiempoTotal = 0;
      this.limiteProcesos = 4;
      this.totalProcesosCreados = 0;
    }

    agregarProceso() {
        return new Promise((resolve) => {
          if (this.totalProcesosCreados < this.limiteProcesos) {
            let rafaga=Math.floor(Math.random() * 10) + 1;
            let size=Math.floor(Math.random() * 1024) + 1;
            const nuevoProceso = new proceso(`P${this.totalProcesosCreados + 1}`,rafaga ,size,"nuevo");
            this.procesos.push(nuevoProceso);
            columnas(nuevoProceso,body);
            this.totalProcesosCreados++;
            console.log(`Nuevo proceso ${nuevoProceso.gId} creado. Tiempo: ${nuevoProceso.gRafaga}. Memoria=${nuevoProceso.gSize}`);
          } else {
            console.log("No más procesos");
          }
          resolve();
        });
      }
    
      ejecutarProceso() {
        return new Promise((resolve) => {
          const procesoActual = this.procesos.shift();

          if (procesoActual) {
            const tiempoEjecucion = Math.min(this.quantum, procesoActual.gRafagar);
            procesoActual.sRafagar = (procesoActual.gRafagar-tiempoEjecucion);
            this.tiempoTotal += tiempoEjecucion;
            nucleo1.value=procesoActual.gId;
            nucleo2.value=procesoActual.gId;
            memoria.value=procesoActual.gSize;
            
            
            console.log(`Proceso ${procesoActual.gId} ejecutado durante ${tiempoEjecucion} unidades de tiempo. Tiempo restante: ${procesoActual.gRafagar >= 0 ? procesoActual.gRafagar : 0}`);
    
            if (procesoActual.gRafagar > 0) {
              procesoActual.sEstado = "Ejecutado"; 
              this.procesos.push(procesoActual);
            } else {
              procesoActual.sEstado = "Terminado"; 
              columnas(procesoActual,body2);
            }
          }

          resolve();
        });
      }
    
      async ejecutar() {
        let agregarProcesoPromise = this.agregarProceso();
        let ejecutarProcesoPromise = this.ejecutarProceso();
    
        while (this.procesos.length > 0 || !this.todosProcesosTerminados()) {
          await Promise.all([agregarProcesoPromise, ejecutarProcesoPromise]);
          agregarProcesoPromise = this.agregarProceso();
            ejecutarProcesoPromise = this.ejecutarProceso();
            
          
          await new Promise(resolve => setTimeout(resolve, 3000)); 
        }
    
        console.log(`Simulación completa. Tiempo total: ${this.tiempoTotal}`);
      }
    
      todosProcesosTerminados() {
        nucleo1.value='';
        nucleo2.value='';
        memoria.value='';
        return this.procesos.every((proceso) => proceso.gRafagar === 0);
      }
    
}

boton.addEventListener('click',()=>{
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  while (body2.firstChild) {
    body2.removeChild(body2.firstChild);
  }
  const quantum = 3;
  const simulador = new RoundRobin(quantum);
  simulador.ejecutar();
})




function columnas(proceso, body){
      
    const row = document.createElement('tr')

    const colId = document.createElement('td')
    colId.appendChild( document.createTextNode(proceso.gId))
    row.appendChild(colId)

    const colSize = document.createElement('td');
    colSize.appendChild(document.createTextNode(proceso.gSize));
    row.appendChild(colSize)
    
    const colRafagai=document.createElement('td');
    colRafagai.appendChild(document.createTextNode(proceso.gRafaga));
    row.appendChild(colRafagai);
    
    const colRafagar=document.createElement('td');
    colRafagar.appendChild(document.createTextNode(proceso.gRafagar));
    row.appendChild(colRafagar);

    const colEstado=document.createElement('td');
    colEstado.appendChild(document.createTextNode(proceso.gEstado));
    row.appendChild(colEstado);

    body.appendChild(row)

    setInterval(() => {
      colRafagar.textContent = proceso.gRafagar; // Actualizar la rafaga restante
      colEstado.textContent = proceso.gEstado; // Actualizar el estado
    }, 500);
}

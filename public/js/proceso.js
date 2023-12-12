class proceso{
    constructor(Id,Rafagai,Size,Estado){
        this.id=Id;
        this.rafaga=Rafagai;
        this.rafagar=Rafagai;
        this.size=Size;
        this.estado=Estado;
}
set sId(id){
    this.id=id;
}
get gId(){
    return this.id;
}
set sRafaga(rafagai){
    this.rafaga=rafagai;
}
get gRafaga(){
    return this.rafaga;
}
set sRafagar(rafagar){
    this.rafagar=rafagar;
}
get gRafagar(){
    return this.rafagar;
}
set sSize(size){
    this.size=size;
}
get gSize(){
    return this.size;
}
set sEstado(estado){
    this.estado=estado;
}
get gEstado(){
    return this.estado;
}
}

//module.exports=Proceso;
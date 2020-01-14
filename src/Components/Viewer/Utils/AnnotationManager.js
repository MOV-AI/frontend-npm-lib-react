import MasterDB from "../../../api/MasterDB";

class AnnotationManager {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.annotations = {};
    this.retrieveAnnotationsFromDb();
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Getters & Setters                                  *
   *                                                                                      */
  //========================================================================================

  getAnnotations = () => this.annotations;

  //========================================================================================
  /*                                                                                      *
   *                                         Utils                                        *
   *                                                                                      */
  //========================================================================================

  retrieveAnnotationsFromDb() {
    MasterDB.subscribe(
      { Scope: "Annotation", Name: "*" },
      data => {
        console.log("Annotation update", data);
        //TODO: handle delete
        const annotation = data.key.Annotation;
        Object.keys(annotation).forEach(name => {
          const annotationObj = annotation[name];
          if (!annotationObj.Type) return;
          const type = annotationObj.Type.toLowerCase();
          const label = annotationObj.Label;
          if (!(type in this.annotations)) {
            this.annotations[type] = { names: [], labels: [] };
          }
          this.annotations[type].names.push(name);
          this.annotations[type].labels.push(label ? label : name);
        });
      },
      data => {
        const annotation = data.value.Annotation;
        Object.keys(annotation).forEach(name => {
          const annotationObj = annotation[name];
          if (!annotationObj.Type) return;
          const type = annotationObj.Type.toLowerCase();
          const label = annotationObj.Label;
          if (!(type in this.annotations)) {
            this.annotations[type] = { names: [], labels: [] };
          }
          this.annotations[type].names.push(name);
          this.annotations[type].labels.push(label);
        });
      }
    );
  }

  //========================================================================================
  /*                                                                                      *
   *                                        Static                                        *
   *                                                                                      */
  //========================================================================================

  static getInstance() {
    return new AnnotationManager();
  }

  static getAnnotations() {
    return AnnotationManager.getInstance().getAnnotations();
  }
}
let instance = null;
export default AnnotationManager;

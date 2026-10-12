import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { 
    mapProjectFromApiToVm, 
} from './project.mapper';


describe('pods/project/project.mapper', () => {
  

  describe('mapProjectFromApiToVm', () => {
    it('debería devolver proyecto vacío cuando proyecto es undefined', () => { 

        // ARRANGE: creamos un argumento con las características que queremos probar
        const project = undefined as unknown as apiModel.Project;

        // ACT: le paso el argumento a la funcion que quiero probar
        const result = mapProjectFromApiToVm(project);

        // ASSERT: resultado que espero que me dé la comprobación
        expect(result).toEqual(viewModel.createEmptyProject()); // .toEqual comprueba que EL CONTENIDO es x 
    });

    it('debería devolver proyecto vacío cuando proyecto es null', () => {

        // ARRANGE
        const project = null as unknown as apiModel.Project;

        // ACT
        const result = mapProjectFromApiToVm(project);

        // ASSERT
        expect(result).toEqual(viewModel.createEmptyProject());
    });

    it('debría devolver el proyecto con sus empleados cuando recibe un proyecto', () => {

        // ARRANGE: creamos un argumento de proyecto con las características que queremos probar
        const project: apiModel.Project = {
            id: '1',
            name: 'Proyecto prueba',
            externalId: 'ext-1',
            comments: 'Un comentario',
            isActive: true,
            employees: [
                { id: 'e1', employeeName: 'Ana', isAssigned: true },
                { id: 'e2', employeeName: 'Marcelo', isAssigned: false },
            ],
        };

        // ACT: pasamos la funcion con el argumento
        const result = mapProjectFromApiToVm(project);

        // ASSERT: resultado que esperao, devolver el mismo proyecto que entró
        expect (result).toEqual(project);
    });

    it('debría devolver el proyecto con sus empleados cuando recibe un proyecto', () => {

        // ARRANGE: creamos un argumento de proyecto sin empleados/lista vacía
        const project: apiModel.Project = {
            id: '1',
            name: 'Proyecto prueba',
            externalId: 'ext-1',
            comments: 'Un comentario',
            isActive: true,
            employees: [ 
                //lista vacía
            ],
        };

        // ACT
        const result = mapProjectFromApiToVm(project);

        // ASSERT
        expect (result).toEqual(project);
    });
  });

  it('debría devolver una COPIA y no el objeto original', () => {

        // ARRANGE
        const project: apiModel.Project = {
            id: '1',
            name: 'Proyecto prueba',
            externalId: 'ext-1',
            comments: 'Un comentario',
            isActive: true,
            employees: [
                { id: 'e1', employeeName: 'Ana', isAssigned: true },
                { id: 'e2', employeeName: 'Marcelo', isAssigned: false },
            ],
        };

        // ACT: pasamos la funcion con el argumento
        const result = mapProjectFromApiToVm(project);

        // ASSERT
        expect (result).not.toBe(project); // .not.toBe se refiere al OBJETO EN SI no al contenido
    });
});
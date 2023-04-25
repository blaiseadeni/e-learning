import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {IconsComponent} from './utilities/icons.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import { DepartementComponent } from './components/departement/departement.component';
import { CoursComponent } from './components/cours/cours.component';
import { EnseignantComponent } from './components/enseignant/enseignant.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { LibrairieComponent } from './components/librairie/librairie/librairie.component';
import { TpComponent } from './components/tp/tp.component';
import { TdComponent } from './components/td/td.component';
import { InterroComponent } from './components/interro/interro.component';
import { ExamenComponent } from './components/examen/examen.component';
import { LiveComponent } from './components/live/live.component';
import { ForumComponent } from './components/forum/forum.component';
import { VideoComponent } from './components/video/video/video.component';
import { GroupeComponent } from './components/groupe/groupe.component';
import { HoraireComponent } from './components/horaire/horaire.component';
import { ArticleComponent } from './components/article/article.component';
import { EvenementComponent } from './components/evenement/evenement/evenement.component';
import { VacanceComponent } from './components/vacance/vacance/vacance.component';
import { PromotionComponent } from './components/promotion/promotion/promotion.component';
import { QuestionComponent } from './components/forum/questions/question/question.component';
import { LectureComponent } from './components/forum/lectures/lecture/lecture.component';
import { LibLectureComponent } from './components/librairie/lib-lecture/lib-lecture.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path:'',
                redirectTo:'login',
                pathMatch:'full',
            },
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'admin', component: DashboardDemoComponent},
                    {path: 'configuration/departement', component: DepartementComponent},
                    {path: 'configuration/promotion', component: PromotionComponent},
                    {path: 'configuration/cours', component: CoursComponent},
                    {path: 'configuration/enseignant', component: EnseignantComponent},
                    {path: 'configuration/etudiant', component: EtudiantComponent},
                    {path: 'configuration/librairie', component: LibrairieComponent},
                    {path: 'librairie/lib-lecture', component: LibLectureComponent},
                    {path: 'evaluation/tp', component: TpComponent},
                    {path: 'evaluation/td', component: TdComponent},
                    {path: 'evaluation/interro', component: InterroComponent},
                    {path: 'evaluation/examen', component: ExamenComponent},
                    {path: 'conference/live', component: LiveComponent},
                    {path: 'conference/forum', component: ForumComponent},
                    {path: 'conference/video', component: VideoComponent},
                    {path: 'conference/groupe', component: GroupeComponent},
                    {path: 'evenement/horaire', component: HoraireComponent},
                    {path: 'evenement/article', component: ArticleComponent},
                    {path: 'evenement/evenement', component: EvenementComponent},
                    {path: 'evenement/vacance', component: VacanceComponent},
                    {path: 'forum/question', component: QuestionComponent},
                    {path: 'forum/lecture', component: LectureComponent},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'components/charts', component: ChartsDemoComponent},
                    {path: 'components/file', component: FileDemoComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'blocks', component: BlocksComponent},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'accessdenied', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},           
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

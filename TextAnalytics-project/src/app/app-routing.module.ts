import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigurationComponent} from "./components/configuration/configuration.component";
import {EntityExtracionComponent} from "./components/entity-extracion/entity-extracion.component";
import {TextSimilarityComponent} from "./components/text-similarity/text-similarity.component";
import {LanguageDetectionComponent} from "./components/language-detection/language-detection.component";
import {SentimentAnalysisComponent} from "./components/sentiment-analysis/sentiment-analysis.component";
import {authGuard} from "../auth.guard";
import {HistoryComponent} from "./components/history/history.component";

const routes: Routes = [

  {
    path: "",
    component: ConfigurationComponent,
    canDeactivate: [authGuard],
  },
  {
    path: "entity",
    component: EntityExtracionComponent,
  },
  {
    path: "text",
    component: TextSimilarityComponent,
  },{
    path: "language",
    component: LanguageDetectionComponent,
  },{
    path: "sentiment",
    component: SentimentAnalysisComponent,
  },{
    path: "history",
    component: HistoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

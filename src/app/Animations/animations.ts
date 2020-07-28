import {
  trigger, state, style, transition,
  animate, group, sequence, animateChild, query
} from '@angular/animations';

export const myAnimations = [

    //Animation dissapear elements
  trigger('imgState', [
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('600ms ease-out') )
  ]),


      //Animation dissapear elements
      trigger('imgTransform', [
        state('void', style({ transform: 'translateX(0%)'})),
        state('translate', style({transform: 'translateX(20%)'})),
        state('rotate', style({transform: 'rotateY(180deg) rotateZ(90deg)'})),
        state('scale', style({transform: 'scale(1.2)'})),

        transition('* => *', animate('1000ms ease'))
    ]),


        //Animation dissapear elements
  trigger('showContainer', [
    state('show', style({ opacity: 1, transform: 'translateX(0%) scale(1)'})),
    state('hide', style({ opacity: 1, transform: 'translateX(-50%) scale(0.2) translateY(-20%)'})),
    transition('show => hide', animate('1000ms ease-out')),
    transition('hide => show', animate('600ms ease-out') )
]),


    //En este caso hide y show se invierten porque hacen referencia al primer conntainer
  trigger('showContainer2', [
      state('hide', style({ transform: 'translateX(0%) scale(1) translateY(0%)'})),
      state('show', style({ transform: 'translateX(50%) scale(0.2) translateY(-20%)'})),
    transition('show => hide', animate('1000ms ease-out')),
    transition('hide => show', animate('600ms ease-out') )
]),











  //Animation that add a fade in animation to the home page elements
  trigger('homepage', [
      state('void', style({ opacity: 0, transform: 'translateX(-20%)' })),
      state('*', style({ opacity: 1, transform: 'translateX(0%)' })),
      transition('void => *',
          animate('1500ms {{delay}} ease-out')
      )
  ]),

  //
  trigger('inputAppearanceFamily',
      [state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *',
          [sequence
              ([style({ opacity: 0 }),
              animate('1500ms')]
              )]
      )]
  ),

  //
  trigger('rightEntranceFamily', [
      state('void', style({ transform: 'translateX(-100%)' })),
      state('*', style({ transform: 'translateX(0)' })),
      transition('void => *', [sequence([style({ opacity: 0 }),
      animate('1500ms cubic-bezier(.01,.3,.4,1)', style({ transform: 'translateX(0)', opacity: 1 }))])
      ])
  ]),

  //
  trigger('leftEntranceFamily', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0)' })),
      transition('void => *', [sequence([style({ opacity: 0 }),
      animate('1500ms cubic-bezier(.01,.3,.4,1)', style({ transform: 'translateX(0)', opacity: 1 }))])
      ])
  ]),

  //
  trigger('shiftRight', [
      state('in', style({ display: "flex" })),
      state('out', style({ opacity: 0, display: "none" })),
      transition('in => out', [sequence([style({ opacity: 1 }),
      animate(1500, style({ transform: 'translateX(1000%)', opacity: 0 }))])
      ])
  ]),

  //
  trigger('shiftLeft', [
      state('in', style({ display: "flex " })),
      state('out', style({ opacity: 0, display: "none" })),
      transition('in => out', [sequence([style({ opacity: 1 }),
      animate(1500, style({ transform: 'translateX(-1000%)', opacity: 0, display: "none" }))])

      ])
  ]),

  //
  trigger('shiftLeftAnchored', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(0)' })),
      transition('in => out', [sequence([style({ transform: 'translateY(30%)', opacity: 1 }),
      animate('1500ms cubic-bezier(.01,.3,.4,1)', style({ transform: 'translateX(-240%)', opacity: 1 }))])
      ])
  ]),

  //Animation that adds a ladder view of the parent position by subfamilies after you select a Family
  trigger('ladder', [
      state('void', style({ height: '0px' })),
      state('*', style({
          height: '{{ladderHeight}}',
      }), { params: { ladderHeight: 0 } }),
      transition('void => *',
          animate('1200ms cubic-bezier(.2,.4,.4,1)')
      )
  ]),

  //Animation that displays each soft skill consecutively
  trigger('softSkill', [
      state('void', style({ opacity: 0 })),
      state('*', style({
          opacity: 1,
      })),
      transition('void => *',
          animate('1000ms {{delay}} cubic-bezier(.2,.4,.4,1)')
      )
  ]),

  //Animation that displays each criteria resizing it in the "Criteria" page
  trigger('criteria', [
      state('void', style({ width: '0%' })),
      state('*', style({
          width: '{{criteriaWidth}}'
      }), { params: { criteriaWidth: '0%' } }),
      transition('void => *',
          [
              group([
                  query('@softSkill', animateChild()),
                  animate('1500ms cubic-bezier(0.55, 0.31, 0.15, 0.93)'),
              ])
          ]
      ),
  ]),
]
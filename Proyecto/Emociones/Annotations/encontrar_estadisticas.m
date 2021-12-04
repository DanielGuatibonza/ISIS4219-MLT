%% Inicio
clear; clc;
load('./Annotations.mat');
%%
valencias = [];
dominancias = [];
excitaciones = [];
train_size = size(train);
for i = 1:train_size(2)
    num_personas = size(train(i).person);
    if num_personas(2) == 1
        valencias = [valencias, train(i).person.annotations_continuous.valence];
        dominancias = [dominancias, train(i).person.annotations_continuous.dominance];
        excitaciones = [excitaciones, train(i).person.annotations_continuous.arousal];
    end 
end

% Todos entre 1 y 10

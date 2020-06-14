kubectl create -f nginx-deployment.yml
kubectl get deployment
kubectl describe deploy my-nginx-deployment (Labels potrzebne do myapp-service-nodeport.yml selector:)

// delete
kubectl delete deploy my-nginx-deployment

Services:
- NodePort
- ClusterIP

kubectl create -f myapp-service-nodeport.yml
kubectl describe service myapp-service
curl localhost:30005
kubectl describe service myapp-service

// delete
kubectl delete svc myapp-service


in mybackend:
yarn add express redis uuid
npm init -y

yarn start
docker build -t adammakiewicz/mybackend .


kubectl create -f mybackend-deployment.yml
kubectl get deploy
kubectl get pod
kubectl logs [pod name]

kubectl create -f mybackend-service-nodeport.yml
kubectl get svc
curl localhost:30009

kubectl get pods
kubectl logs [pod name form get pods]